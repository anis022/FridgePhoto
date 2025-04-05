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


@fridge_bp.route('/api/fridge/add', methods=['POST'])
def add_fridge_items():
    data = request.get_json()
    if not data or "items" not in data:
        return jsonify({"error": "No items provided"}), 400

    items = data["items"]
    user_id = "default_user"  # Using a default user; in a real app, use the authenticated user's id

    # Import the users collection from fridge_db
    from db.fridge_db import users
    try:
        # Update the user document to set the 'fridgeItems' field to the provided items list.
        users.update_one(
            {"_id": user_id},
            {"$set": {"fridgeItems": items}},
            upsert=True
        )
        return jsonify({"message": "Items added to your Perfect Fridge!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fridge_bp.route('/api/fridge/get', methods=['GET'])
def get_fridge_items():
    user_id = "default_user"
    from db.fridge_db import users
    user = users.find_one({"_id": user_id})
    if not user:
        return jsonify({"items": []}), 200

    # Retrieve fridge items; if the field doesn't exist, return an empty list.
    items = user.get("fridgeItems", [])
    return jsonify({"items": items}), 200

@fridge_bp.route('/api/fridge/remove', methods=['DELETE'])
def remove_fridge_item():
    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "No item name provided"}), 400

    name = data["name"]
    user_id = "default_user"
    from db.fridge_db import users
    user = users.find_one({"_id": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Retrieve current fridge items from the user's document.
    fridge_items = user.get("fridgeItems", [])
    # Filter out the item to be removed (assumes each item is an object with a "name" property).
    updated_items = [item for item in fridge_items if item.get("name") != name]

    try:
        users.update_one({"_id": user_id}, {"$set": {"fridgeItems": updated_items}})
        return jsonify({"message": "Item removed"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@fridge_bp.route('/history', methods=['GET'])
def history():
    data = get_user_scans("default_user")
    return jsonify(data)
