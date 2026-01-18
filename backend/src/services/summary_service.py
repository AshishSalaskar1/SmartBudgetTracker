from db.connection import get_connection


def get_monthly_summary(user_id: str, month: int, year: int) -> dict:
    conn = get_connection()

    summary_row = conn.execute(
        """
        SELECT
          COALESCE(SUM(CASE WHEN t.direction = 'credit' THEN t.amount END), 0) AS total_income,
                    COALESCE(SUM(CASE WHEN t.direction = 'debit' AND (t.category IS NULL OR t.category != 'Investments') THEN t.amount END), 0) AS total_expense,
                    COALESCE(SUM(CASE WHEN t.direction = 'debit' AND t.category = 'Investments' THEN t.amount END), 0) AS total_investments,
          COUNT(t.id) AS transaction_count
        FROM bank_statements s
        JOIN transactions t ON t.statement_id = s.id
        WHERE s.user_id = ? AND s.month = ? AND s.year = ?
        """,
        [user_id, month, year],
    ).fetchone()

    if not summary_row:
        total_income = 0.0
        total_expense = 0.0
        total_investments = 0.0
        transaction_count = 0
    else:
        total_income = float(summary_row[0] or 0)
        total_expense = float(summary_row[1] or 0)
        total_investments = float(summary_row[2] or 0)
        transaction_count = int(summary_row[3] or 0)

    top_merchants = conn.execute(
        """
        SELECT description, SUM(amount) AS total
        FROM bank_statements s
        JOIN transactions t ON t.statement_id = s.id
                WHERE s.user_id = ? AND s.month = ? AND s.year = ?
                    AND t.direction = 'debit'
                    AND (t.category IS NULL OR t.category != 'Investments')
        GROUP BY description
        ORDER BY total DESC
        LIMIT 5
        """,
        [user_id, month, year],
    ).fetchall()

    daily_spend = conn.execute(
        """
        SELECT t.date, SUM(t.amount) AS total
        FROM bank_statements s
        JOIN transactions t ON t.statement_id = s.id
                WHERE s.user_id = ? AND s.month = ? AND s.year = ?
                    AND t.direction = 'debit'
                    AND (t.category IS NULL OR t.category != 'Investments')
        GROUP BY t.date
        ORDER BY t.date
        """,
        [user_id, month, year],
    ).fetchall()

    return {
        "month": month,
        "year": year,
        "total_income": total_income,
        "total_expense": total_expense,
        "total_investments": total_investments,
        "net": total_income - total_expense,
        "transaction_count": transaction_count,
        "top_merchants": [
            {"merchant": row[0], "amount": float(row[1])} for row in top_merchants
        ],
        "daily_spend": [
            {"date": str(row[0]), "amount": float(row[1])} for row in daily_spend
        ],
    }


def get_yearly_summary(user_id: str, year: int) -> dict:
    conn = get_connection()

    summary_row = conn.execute(
        """
        SELECT
          COALESCE(SUM(CASE WHEN t.direction = 'credit' THEN t.amount END), 0) AS total_income,
                    COALESCE(SUM(CASE WHEN t.direction = 'debit' AND (t.category IS NULL OR t.category != 'Investments') THEN t.amount END), 0) AS total_expense,
                    COALESCE(SUM(CASE WHEN t.direction = 'debit' AND t.category = 'Investments' THEN t.amount END), 0) AS total_investments,
          COUNT(t.id) AS transaction_count
        FROM bank_statements s
        JOIN transactions t ON t.statement_id = s.id
        WHERE s.user_id = ? AND s.year = ?
        """,
        [user_id, year],
    ).fetchone()

    if not summary_row:
        total_income = 0.0
        total_expense = 0.0
        total_investments = 0.0
        transaction_count = 0
    else:
        total_income = float(summary_row[0] or 0)
        total_expense = float(summary_row[1] or 0)
        total_investments = float(summary_row[2] or 0)
        transaction_count = int(summary_row[3] or 0)

    monthly_totals = conn.execute(
        """
        SELECT s.month,
          COALESCE(SUM(CASE WHEN t.direction = 'credit' THEN t.amount END), 0) AS income,
                    COALESCE(SUM(CASE WHEN t.direction = 'debit' AND (t.category IS NULL OR t.category != 'Investments') THEN t.amount END), 0) AS expense,
                    COALESCE(SUM(CASE WHEN t.direction = 'debit' AND t.category = 'Investments' THEN t.amount END), 0) AS investments
        FROM bank_statements s
        JOIN transactions t ON t.statement_id = s.id
        WHERE s.user_id = ? AND s.year = ?
        GROUP BY s.month
        ORDER BY s.month
        """,
        [user_id, year],
    ).fetchall()

    category_totals = conn.execute(
        """
        SELECT t.category, SUM(t.amount) AS total
        FROM bank_statements s
        JOIN transactions t ON t.statement_id = s.id
                WHERE s.user_id = ? AND s.year = ?
                    AND t.direction = 'debit'
                    AND (t.category IS NULL OR t.category != 'Investments')
        GROUP BY t.category
        ORDER BY total DESC
        """,
        [user_id, year],
    ).fetchall()

    return {
        "year": year,
        "total_income": total_income,
        "total_expense": total_expense,
        "total_investments": total_investments,
        "net": total_income - total_expense,
        "transaction_count": transaction_count,
        "monthly_totals": [
            {
                "month": int(row[0]),
                "income": float(row[1]),
                "expense": float(row[2]),
                "investments": float(row[3]),
                "net": float(row[1]) - float(row[2]),
            }
            for row in monthly_totals
        ],
        "category_totals": [
            {"category": row[0], "amount": float(row[1])} for row in category_totals
        ],
    }
