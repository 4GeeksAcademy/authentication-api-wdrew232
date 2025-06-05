from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS  # 🔹 Import CORS
from api.models import db, User
from api.utils import APIException

api = Blueprint("api", __name__)

# Enable CORS for API routes 🔹
CORS(api, resources={r"/*": {"origins": "*"}})  # Allows frontend requests

# Hello route (for testing)
@api.route("/hello", methods=["GET"])
def handle_hello():
    return jsonify({"message": "Hello! This is a backend response."}), 200

# Signup route
@api.route("/Signup", methods=["POST"])
def signup():
    data = request.get_json()
    if not data or "email" not in data or "password" not in data:
        return jsonify({"message": "Missing email or password"}), 400

    hashed_password = generate_password_hash(data["password"])
    new_user = User(email=data["email"], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

# Login route
@api.route("/Login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or "email" not in data or "password" not in data:
        return jsonify({"message": "Missing email or password"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if user and check_password_hash(user.password_hash, data["password"]):
        access_token = create_access_token(identity=user.email)
        return jsonify({"access_token": access_token}), 200

    return jsonify({"message": "Invalid credentials"}), 401

# Private route (protected)
@api.route("/Private", methods=["GET"])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Welcome {current_user}, you are authenticated!"}), 200
