
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3

from database import get_connection

app = Flask(__name__)
CORS(app)


# HOME
@app.route("/")
def home():
    return jsonify({
        "message": "MicroGoal Tracker backend is running!"
    })


# HEALTH CHECK
@app.route("/api/health")
def health():
    return jsonify({
        "status": "success",
        "message": "Backend is working correctly"
    })


# STUDENT REGISTRATION
@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}

    full_name = str(data.get("full_name", "")).strip()
    email = str(data.get("email", "")).strip().lower()
    password = data.get("password", "")

    if (
        not full_name
        or not email
        or not isinstance(password, str)
        or not password.strip()
    ):
        return jsonify({
            "error": "Full name, email and password are required."
        }), 400

    if "@" not in email or email.startswith("@") or email.endswith("@"):
        return jsonify({
            "error": "Please enter a valid email address."
        }), 400

    if len(password) < 8:
        return jsonify({
            "error": "Password must be at least 8 characters."
        }), 400

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


# STUDENT CONNECTION
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}

    email = str(data.get("email", "")).strip().lower()
    password = data.get("password", "")

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
        student = connection.execute(
            """
            SELECT student_id, full_name, email, password_hash
            FROM Student
            WHERE email = ?
            """,
            (email,)
        ).fetchone()

        if student is None or not check_password_hash(
            student["password_hash"], password
        ):
            return jsonify({
                "error": "Invalid email or password."
            }), 401

        return jsonify({
            "message": "Connection successful!",
            "student": {
                "student_id": student["student_id"],
                "full_name": student["full_name"],
                "email": student["email"]
            }
        }), 200

    finally:
        connection.close()


# HELPER: CHECK STUDENT ID
def get_student_id(value):
    try:
        student_id = int(value)
        return student_id if student_id > 0 else None
    except (TypeError, ValueError):
        return None


# HELPER: FORMAT GOAL FOR REACT
def format_goal(goal):
    return {
        "id": goal["goal_id"],
        "title": goal["title"],
        "subject": goal["course_name"] or "",
        "date": goal["deadline"] or "",
        "priority": goal["priority"],
        "description": goal["description"] or "",
        "progress": 100 if goal["status"] == "Completed" else 0,
        "status": goal["status"]
    }


# CREATE ACADEMIC GOAL
@app.route("/api/goals", methods=["POST"])
def create_goal():
    data = request.get_json(silent=True) or {}

    student_id = get_student_id(data.get("student_id"))
    title = str(data.get("title", "")).strip()
    description = str(data.get("description", "")).strip()
    subject = str(data.get("subject", "")).strip()
    deadline = str(data.get("date", "")).strip()
    priority = str(data.get("priority", "Medium")).strip()

    if not student_id:
        return jsonify({
            "error": "A valid student ID is required."
        }), 400

    if not title or not subject or not deadline:
        return jsonify({
            "error": "Goal title, subject and deadline are required."
        }), 400

    if priority not in ["Low", "Medium", "High"]:
        return jsonify({
            "error": "Priority must be Low, Medium or High."
        }), 400

    connection = get_connection()

    try:
        student = connection.execute(
            "SELECT student_id FROM Student WHERE student_id = ?",
            (student_id,)
        ).fetchone()

        if student is None:
            return jsonify({
                "error": "Student account was not found."
            }), 404

        cursor = connection.execute(
            """
            INSERT INTO Goal
            (student_id, title, description, course_name, deadline, priority)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                student_id,
                title,
                description,
                subject,
                deadline,
                priority
            )
        )

        connection.commit()

        saved_goal = connection.execute(
            """
            SELECT *
            FROM Goal
            WHERE goal_id = ?
            """,
            (cursor.lastrowid,)
        ).fetchone()

        return jsonify({
            "message": "Goal created successfully!",
            "goal": format_goal(saved_goal)
        }), 201

    finally:
        connection.close()


# GET GOALS FOR ONE STUDENT
@app.route("/api/goals", methods=["GET"])
def get_goals():
    student_id = get_student_id(request.args.get("student_id"))

    if not student_id:
        return jsonify({
            "error": "A valid student ID is required."
        }), 400

    connection = get_connection()

    try:
        student = connection.execute(
            "SELECT student_id FROM Student WHERE student_id = ?",
            (student_id,)
        ).fetchone()

        if student is None:
            return jsonify({
                "error": "Student account was not found."
            }), 404

        goals = connection.execute(
            """
            SELECT *
            FROM Goal
            WHERE student_id = ?
            ORDER BY created_at DESC
            """,
            (student_id,)
        ).fetchall()

        return jsonify({
            "goals": [format_goal(goal) for goal in goals]
        }), 200

    finally:
        connection.close()


# UPDATE AN EXISTING GOAL
@app.route("/api/goals/<int:goal_id>", methods=["PUT"])
def update_goal(goal_id):
    data = request.get_json(silent=True) or {}

    student_id = get_student_id(data.get("student_id"))

    if not student_id:
        return jsonify({
            "error": "A valid student ID is required."
        }), 400

    connection = get_connection()

    try:
        existing_goal = connection.execute(
            """
            SELECT *
            FROM Goal
            WHERE goal_id = ? AND student_id = ?
            """,
            (goal_id, student_id)
        ).fetchone()

        if existing_goal is None:
            return jsonify({
                "error": "Goal not found for this student."
            }), 404

        title = str(data.get("title", existing_goal["title"])).strip()
        description = str(
            data.get("description", existing_goal["description"] or "")
        ).strip()
        subject = str(
            data.get("subject", existing_goal["course_name"] or "")
        ).strip()
        deadline = str(
            data.get("date", existing_goal["deadline"] or "")
        ).strip()
        priority = str(
            data.get("priority", existing_goal["priority"])
        ).strip()
        status = str(
            data.get("status", existing_goal["status"])
        ).strip()

        if not title or not subject or not deadline:
            return jsonify({
                "error": "Goal title, subject and deadline are required."
            }), 400

        if priority not in ["Low", "Medium", "High"]:
            return jsonify({
                "error": "Priority must be Low, Medium or High."
            }), 400

        if status not in ["In Progress", "Completed"]:
            return jsonify({
                "error": "Status must be In Progress or Completed."
            }), 400

        connection.execute(
            """
            UPDATE Goal
            SET title = ?,
                description = ?,
                course_name = ?,
                deadline = ?,
                priority = ?,
                status = ?
            WHERE goal_id = ? AND student_id = ?
            """,
            (
                title,
                description,
                subject,
                deadline,
                priority,
                status,
                goal_id,
                student_id
            )
        )

        connection.commit()

        updated_goal = connection.execute(
            "SELECT * FROM Goal WHERE goal_id = ?",
            (goal_id,)
        ).fetchone()

        return jsonify({
            "message": "Goal updated successfully!",
            "goal": format_goal(updated_goal)
        }), 200

    finally:
        connection.close()


# DELETE A GOAL
@app.route("/api/goals/<int:goal_id>", methods=["DELETE"])
def delete_goal(goal_id):
    student_id = get_student_id(request.args.get("student_id"))

    if not student_id:
        return jsonify({
            "error": "A valid student ID is required."
        }), 400

    connection = get_connection()

    try:
        cursor = connection.execute(
            """
            DELETE FROM Goal
            WHERE goal_id = ? AND student_id = ?
            """,
            (goal_id, student_id)
        )

        if cursor.rowcount == 0:
            return jsonify({
                "error": "Goal not found for this student."
            }), 404

        connection.commit()

        return jsonify({
            "message": "Goal deleted successfully!"
        }), 200

    finally:
        connection.close()


# RUN APPLICATION
if __name__ == "__main__":
    app.run(debug=True, port=5000)
