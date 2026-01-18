# SmartBudgetTracker

SmartBudgetTracker is a local-first personal budget tracker with an AI-assisted statement parser. It turns monthly statements into clean dashboards with spending trends, category insights, and yearly rollups.

Landing experience with a modern product overview and login panel.
[![Landing_Page.png](https://i.postimg.cc/XX6q90cN/Landing_Page.png)](https://postimg.cc/K3QmywHC)

Statement upload flow with month/year selection and replace handling.
[![Upload_Page.png](https://i.postimg.cc/sX8vDWMq/Upload_Page.png)](https://postimg.cc/mzYbmtNy)

Yearly dashboard with summary insights, charts, and trends.
[![Yearly_Page_(1).png](https://i.postimg.cc/5NzsBdMt/Yearly_Page_(1).png)](https://postimg.cc/56x5Jryc)

Monthly deep dive with category spend, cashflow, and transactions.
[![Monthly-Page-(1).png](https://i.postimg.cc/4xdmCZ4B/Monthly-Page-(1).png)](https://postimg.cc/gnCYRCZZ)



## Features

- Local-first FastAPI backend with DuckDB storage
- Azure OpenAI extraction for PDF/CSV/XLSX statements
- Monthly and yearly analytics dashboards
- Modern UI with rich charts and filters
- Simple auth for two local users
- Replace/keep upload behavior for existing months

## Tech Stack

- Backend: FastAPI, DuckDB, Pydantic, openai (Azure OpenAI)
- Frontend: React + Vite + TypeScript, Recharts
- Auth: simple bearer token (local)

## Prerequisites

- Python 3.11+
- Node.js 20+
- Azure AI Foundry credentials (endpoint + API key + deployment name)

## Quick Start

### Backend

1. Create a virtual environment and install dependencies.
2. Configure environment variables (example below).
3. Run the API server.

Example .env (backend/.env):

```
AZURE_AI_ENDPOINT=
AZURE_AI_API_KEY=
AZURE_AI_DEPLOYMENT=
DB_PATH=/home/you/.smartbudget/duckdb.db
APP_ADMIN_USERNAME=admin
APP_ADMIN_PASSWORD=admin123
APP_USER_USERNAME=user
APP_USER_PASSWORD=user123
```

### Frontend

1. Install dependencies.
2. Configure the API base URL (example below).
3. Start the dev server.

Example .env (frontend/.env):

```
VITE_API_BASE=/api
```

## Running Locally

- Backend: start the FastAPI app on http://localhost:8000
- Frontend: start Vite on http://localhost:5173

The frontend proxies /api requests to the backend in development.

## Usage

1. Login with a local user.
2. Upload a statement (PDF/CSV/XLSX) with month and year.
3. Explore monthly and yearly insights, charts, and transactions.

## Notes

- Investments are excluded from expense calculations and charts.
- If a month already exists, you’ll be prompted to replace or keep.

## License

MIT
