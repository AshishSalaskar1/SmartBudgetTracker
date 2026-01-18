import uuid

from config import settings
from services.auth import generate_salt, hash_password
from db.connection import get_connection
from db.init_db import init_db


def seed_users() -> None:
    init_db()
    conn = get_connection()

    users = [
        (settings.app_admin_username, settings.app_admin_password, "admin"),
        (settings.app_user_username, settings.app_user_password, "user"),
    ]

    for username, password, role in users:
        existing = conn.execute(
            "SELECT 1 FROM users WHERE username = ? LIMIT 1",
            [username],
        ).fetchone()
        if existing:
            continue

        salt = generate_salt()
        password_hash = hash_password(password, salt)
        conn.execute(
            "INSERT INTO users (id, username, password_hash, salt, role) VALUES (?, ?, ?, ?, ?)",
            [str(uuid.uuid4()), username, password_hash, salt, role],
        )
