
import sqlite3
from datetime import date
from pathlib import Path

# Store the database inside the backend folder
DATABASE_PATH = Path(__file__).resolve().parent / "microgoal.db"


def get_connection():
    """Create a connection and safely check database migrations."""
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")

    # Safely add completed_at if it does not already exist.
    columns = connection.execute(
        "PRAGMA table_info(MicroGoal)"
    ).fetchall()

    if columns:
        column_names = [column["name"] for column in columns]

        if "completed_at" not in column_names:
            connection.execute(
                "ALTER TABLE MicroGoal ADD COLUMN completed_at TEXT"
            )
            connection.commit()

    return connection


def create_tables():
    """Create the main tables for the MicroGoal Tracker."""
    connection = get_connection()

    try:
        connection.executescript("""
            CREATE TABLE IF NOT EXISTS Student (
                student_id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS Goal (
                goal_id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                course_name TEXT,
                deadline TEXT,
                priority TEXT DEFAULT 'Medium',
                status TEXT NOT NULL DEFAULT 'In Progress',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (student_id)
                    REFERENCES Student(student_id)
                    ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS MicroGoal (
                micro_goal_id INTEGER PRIMARY KEY AUTOINCREMENT,
                goal_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                is_completed INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                completed_at TEXT,
                FOREIGN KEY (goal_id)
                    REFERENCES Goal(goal_id)
                    ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS StudyActivity (
                activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id INTEGER NOT NULL,
                goal_id INTEGER,
                activity_description TEXT NOT NULL,
                duration_minutes INTEGER NOT NULL DEFAULT 0,
                activity_date TEXT NOT NULL DEFAULT CURRENT_DATE,
                FOREIGN KEY (student_id)
                    REFERENCES Student(student_id)
                    ON DELETE CASCADE,
                FOREIGN KEY (goal_id)
                    REFERENCES Goal(goal_id)
                    ON DELETE SET NULL
            );

            CREATE TABLE IF NOT EXISTS ProgressReport (
                report_id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id INTEGER NOT NULL,
                report_date TEXT NOT NULL DEFAULT CURRENT_DATE,
                goals_completed INTEGER NOT NULL DEFAULT 0,
                micro_goals_completed INTEGER NOT NULL DEFAULT 0,
                study_minutes INTEGER NOT NULL DEFAULT 0,
                FOREIGN KEY (student_id)
                    REFERENCES Student(student_id)
                    ON DELETE CASCADE
            );
        """)

        # Also handle existing databases whose tables already existed.
        columns = connection.execute(
            "PRAGMA table_info(MicroGoal)"
        ).fetchall()

        column_names = [column["name"] for column in columns]

        if "completed_at" not in column_names:
            connection.execute(
                "ALTER TABLE MicroGoal ADD COLUMN completed_at TEXT"
            )

        connection.commit()

    finally:
        connection.close()


if __name__ == "__main__":
    create_tables()
    print("Database and tables created successfully!")
