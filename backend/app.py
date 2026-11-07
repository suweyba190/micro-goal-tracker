
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3

from database import get_connection

app = Flask(__name__)
CORS(app)


# Home route
@app.route("/")
def home():
    return jsonify({
        "message": "MicroGoal Tracker backend is running!"
    })


# Health check route
@app.route("/api/health")
def health():
    return jsonify({
        "status": "success",
        "message": "Backend is working correctly"
    })


# Student registration
@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}

    full_name = str(data.get("full_name", "")).strip()
    email = str(data.get("email", "")).strip().lower()
    password = data.get("password", "")

    # Validate required fields
    if (
        not full_name
        or not email
        or not isinstance(password, str)
        or not password.strip()
    ):
        return jsonify({
            "error": "Full name, email and password are required."
        }), 400

    # Basic email validation
    if "@" not in email or email.startswith("@") or email.endswith("@"):
        return jsonify({
            "error": "Please enter a valid email address."
        }), 400

    # Enforce minimum password length
    if len(password) < 8:
        return jsonify({
            "error": "Password must be at least 8 characters."
        }), 400

    # Hash the password before storing it
    password_hash = generate_password_hash(password)

    connection = get_connection()

    try:
        cursor = connection.execute(
            """
            INSERT INTO Student (full_name, email, password_hash)
            VALUES (?, ?, ?)
            """,
            (full_name, email, password_hash)
        )

        connection.commit()

        return jsonify({
            "message": "Student registered successfully!",
            "student_id": cursor.lastrowid
        }), 201

    except sqlite3.IntegrityError:
        return jsonify({
            "error": "This email is already registered."
        }), 409

    finally:
        connection.close()


# Student login
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}

    email = str(data.get("email", "")).strip().lower()
    password = data.get("password", "")

    # Reject missing or blank credentials
    if (
        not email
        or not isinstance(password, str)
        or not password.strip()
    ):
        return jsonify({
            "error": "Email and password are required."
        }), 400

    connection = get_connection()

    try:
        # Find the student using their email
        student = connection.execute(
            """
            SELECT student_id, full_name, email, password_hash
            FROM Student
            WHERE email = ?
            """,
            (email,)
        ).fetchone()

        # Verify the submitted password against the stored hash
        if student is None or not check_password_hash(
            student["password_hash"], password
        ):
            return jsonify({
                "error": "Invalid email or password."
            }), 401

        # Return student information, never the password or its hash
        return jsonify({
            "message": "Login successful!",
            "student": {
                "student_id": student["student_id"],
                "full_name": student["full_name"],
                "email": student["email"]
            }
        }), 200

    finally:
        connection.close()


# Run the application
if __name__ == "__main__":
    app.run(debug=True, port=5000)
