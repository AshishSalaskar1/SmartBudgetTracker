from db.connection import get_connection


def get_transactions(user_id: str, month: int, year: int):
    conn = get_connection()
    rows = conn.execute(
        """
        SELECT t.id, t.date, t.description, t.category, t.reason, t.amount, t.direction
        FROM bank_statements s
        JOIN transactions t ON t.statement_id = s.id
        WHERE s.user_id = ? AND s.month = ? AND s.year = ?
        ORDER BY t.date
        """,
        [user_id, month, year],
    ).fetchall()

    return [
        {
            "id": row[0],
            "date": str(row[1]),
            "description": row[2],
            "category": row[3],
            "reason": row[4],
            "amount": float(row[5]),
            "direction": row[6],
        }
        for row in rows
    ]


def get_yearly_transactions(user_id: str, year: int, limit: int, offset: int):
    conn = get_connection()
    total = conn.execute(
        """
        SELECT COUNT(*)
        FROM bank_statements s
        JOIN transactions t ON t.statement_id = s.id
        WHERE s.user_id = ? AND s.year = ?
        """,
        [user_id, year],
    ).fetchone()[0]

    rows = conn.execute(
        """
        SELECT t.id, t.date, t.description, t.category, t.reason, t.amount, t.direction
        FROM bank_statements s
        JOIN transactions t ON t.statement_id = s.id
        WHERE s.user_id = ? AND s.year = ?
        ORDER BY t.date DESC
        LIMIT ? OFFSET ?
        """,
        [user_id, year, limit, offset],
    ).fetchall()

    items = [
        {
            "id": row[0],
            "date": str(row[1]),
            "description": row[2],
            "category": row[3],
            "reason": row[4],
            "amount": float(row[5]),
            "direction": row[6],
        }
        for row in rows
    ]

    return {"items": items, "total": total}
