#fridge_db.py
import os
from pymongo import MongoClient
from dotenv import load_dotenv


env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '.env'))
load_dotenv(dotenv_path=env_path)

client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("MONGO_DB")]
users = db['users']

def get_user_fridge(user_id):
    user = users.find_one({"_id": user_id})
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
