from flask import Blueprint, request, jsonify
from db.fridge_db import get_missing_items, get_user_scans, save_scan_result
from model.detector import detect_items
from model.clip_utils import enrich_with_clip
from services.recipe_gen import generate_recipe

import os
from PIL import Image
import uuid

fridge_bp = Blueprint('fridge', __name__)
UPLOAD_FOLDER = os.path.join("model", "crops")  # for saving if needed

@fridge_bp.route('/upload', methods=['POST'])
def upload():
    file = request.files.get('image')
    if not file:
        return jsonify({'error': 'No image uploaded'}), 400

    filename = f"{uuid.uuid4().hex}.jpg"
    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)

    image = Image.open(path)

    # Step 1: Object Detection
    detections, crops = detect_items(image)

    # Step 2: CLIP Labeling
    enriched = enrich_with_clip(crops)

    # Step 3: Save Detection History
    save_scan_result("default_user", enriched)

    # Step 4: Recipe Generation
    recipe = generate_recipe(enriched)

    # Step 5: Compare to Ideal Fridge
    missing = get_missing_items(enriched)

    return jsonify({
        'ingredients': enriched,
        'recipe': recipe,
        'missing_items': missing
    })

@fridge_bp.route('/history', methods=['GET'])
def history():
    data = get_user_scans("default_user")
    return jsonify(data)
