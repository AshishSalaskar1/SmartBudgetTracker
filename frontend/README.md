# Frontend (Vite + React)

## Prerequisites
- Node.js 20+

## Setup
1. Install dependencies:
   - `npm install`
2. Create a `.env` file (copy from `.env.example`) and verify:
   - `VITE_API_BASE=/api`

## Run
- Start the dev server:
  - `npm run dev`

## Notes
- The dev server proxies `/api/*` to `http://localhost:8000` via Vite.
- Login first using the credentials from backend `.env`.
