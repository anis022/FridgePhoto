#fridge_db.py
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime


env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '.env'))
load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("MONGO_DB")]
users = db['users']



def get_user_fridge(user_id):
    user = users.find_one({"_id": user_id})
    if not user:
        # Create default user with empty fridge
        users.insert_one({"_id": user_id, "ideal_fridge": {}})
        return {}
    return user.get("ideal_fridge", {})


def get_missing_items(detected_items, user_id="default_user"):
    ideal = get_user_fridge(user_id)

    found = {}
    for item in detected_items:
        name = item['item']
        found[name] = found.get(name, 0) + 1

    missing = []
    for item, qty in ideal.items():
        if found.get(item, 0) < qty:
            missing.append({
                'item': item,
                'needed': qty - found.get(item, 0)
            })

    return missing

def init_user_ideal_fridge():
    # Call this once to create user config
    users.update_one(
        {"_id": "default_user"},
        {"$set": {"ideal_fridge": {
            "milk": 1,
            "eggs": 12,
            "cheese": 1,
            "butter": 1,
            "lettuce": 1
        }}},
        upsert=True
    )

scans = db['scans']

def save_scan_result(user_id, ingredients):
    scans.insert_one({
        "user_id": user_id,
        "ingredients": ingredients,
        "timestamp": datetime.now()
    })

def get_user_scans(user_id):
    return list(scans.find({"user_id": user_id}).sort("timestamp", -1))
