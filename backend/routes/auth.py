# backend/routes/auth.py
from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
from flask_cors import CORS
import os
import bcrypt
import jwt
from datetime import datetime, timedelta

load_dotenv()
auth_bp = Blueprint('auth', __name__)
CORS(auth_bp)

client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("MONGO_DB")]
users = db["users"]

JWT_SECRET = os.getenv("JWT_SECRET", "mysecret")
JWT_ALGORITHM = "HS256"
JWT_EXP_DELTA_SECONDS = 3600

@auth_bp.route("/api/signup", methods=["POST"])
def signup():
    print("🔧 Signup endpoint hit")
    try:
        data = request.json
        required_fields = [
            "first_name", "last_name", "email",
            "username", "password", "tel", "date_of_birth"
        ]

        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing field: {field}"}), 400

        if users.find_one({"username": data["username"]}):
            return jsonify({"error": "Username already exists"}), 409

        hashed_pw = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        new_user = {
            "first_name": data["first_name"],
            "last_name": data["last_name"],
            "email": data["email"],
            "username": data["username"],
            "password": hashed_pw,
            "tel": data["tel"],
            "date_of_birth": data["date_of_birth"],
            "ideal_fridge": [],
            "scans": [],
        }

        users.insert_one(new_user)

        return jsonify({"message": "User created successfully"}), 201

    except Exception as e:
        print(f"[ERROR] Signup failed: {e}")
        return jsonify({"error": "Internal server error"}), 500
    
@auth_bp.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing JSON"}), 400

    username = data.get("username")
    password = data.get("password")

    # Find the user in the database by username
    user = users.find_one({"username": username})
    if not user or not bcrypt.checkpw(password.encode("utf-8"), user["password"].encode('utf-8')):
        return jsonify({"error": "Invalid credentials"}), 401

    # Create a JWT payload containing the username and an expiration time
    payload = {
        "username": user["username"],
        "exp": datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
    }
    # Generate the JWT token using the secret and algorithm defined above
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    
    # Return the token along with a success message and username
    return jsonify({"message": "Login successful", "user": user["username"], "token": token}), 200
