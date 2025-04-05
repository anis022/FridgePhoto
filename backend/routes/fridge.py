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
