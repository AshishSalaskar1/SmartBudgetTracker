# Data Model

## Entities

### User
- **Fields**:
  - `id` (UUID, primary key)
  - `username` (string, unique, required)
  - `password_hash` (string, required)
  - `salt` (string, required)
  - `role` (enum: `admin`, `user`)
  - `created_at` (timestamp)
- **Validation**:
  - `username` non-empty, 3–64 chars
  - `role` in {admin, user}
- **Notes**:
  - Admin has no special capabilities in MVP.

### BankStatement
- **Fields**:
  - `id` (UUID, primary key)
  - `user_id` (UUID, FK → User)
  - `month` (int, 1–12)
  - `year` (int, 2000–2100)
  - `original_filename` (string)
  - `uploaded_at` (timestamp)
  - `status` (enum: `uploaded`, `processing`, `failed`, `ready`)
  - `error_message` (string, nullable)
- **Validation**:
  - Unique per (`user_id`, `month`, `year`)
  - `month`/`year` required (user-selected)
- **State transitions**:
  - `uploaded` → `processing`
  - `processing` → `ready` | `failed`

### Transaction
- **Fields**:
  - `id` (UUID, primary key)
  - `statement_id` (UUID, FK → BankStatement)
  - `date` (date, required)
  - `description` (string, required)
  - `amount` (decimal, required)
  - `direction` (enum: `credit`, `debit`, required)
  - `created_at` (timestamp)
- **Validation**:
  - `amount` > 0
  - `description` non-empty
  - `direction` in {credit, debit}

## Relationships
- User 1─* BankStatement
- BankStatement 1─* Transaction

## Derived Views (for UI)
- **MonthlySummary** (derived): totals, category breakdown (optional), top merchants, daily spend trend.
