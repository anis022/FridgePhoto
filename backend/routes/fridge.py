from flask import Blueprint, request, jsonify
from db.fridge_db import get_missing_items, get_user_scans, save_scan_result
from model.detector import detect_items
from model.clip_utils import enrich_with_clip
from services.recipe_gen import generate_recipe

import os
from PIL import Image, UnidentifiedImageError
from io import BytesIO
import base64

fridge_bp = Blueprint('fridge', __name__)
UPLOAD_FOLDER = os.path.join("model", "crops")  # for saving if needed

@fridge_bp.route('/api/upload', methods=['POST'])
def upload():
    file = request.files.get('image')
    if not file:
        return jsonify({'error': 'No image uploaded'}), 400

    try:
        image_file = request.files['image']

        image = Image.open(BytesIO(image_file.read()))

        # Validate image format
        if image.format not in ('JPEG', 'PNG'):
            return jsonify({'error': 'Unsupported image format'}), 400

        items, crops, annotated_img = detect_items(image)
        # save_scan_result(current_user.id, items)

        return jsonify({
            "photo": image_to_base64(annotated_img),
            "items": items,
        })
    
    except UnidentifiedImageError:
        return jsonify({'error': 'Invalid or corrupted image'}), 400
        
    except Exception as e:
        return jsonify({'error': 'Processing failed', 'code': str(e)}), 500

def image_to_base64(pil_image):
    """Convert PIL image to base64-encoded JPEG"""
    buffer = BytesIO()
    pil_image.save(buffer, format="JPEG", quality=85)
    return base64.b64encode(buffer.getvalue()).decode('utf-8')


@fridge_bp.route('/history', methods=['GET'])
def history():
    data = get_user_scans("default_user")
    return jsonify(data)
