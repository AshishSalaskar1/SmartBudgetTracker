---

description: "Task list for Personal Budget Tracker"
---

# Tasks: Personal Budget Tracker

**Input**: Design documents from `/specs/001-budget-tracker/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested (manual verification only).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create backend app scaffold in backend/src/app.py and backend/src/main.py
- [x] T002 Create frontend Vite scaffold in frontend/index.html, frontend/src/main.tsx, frontend/src/App.tsx
- [x] T003 [P] Add backend dependencies in backend/requirements.txt
- [x] T004 [P] Add frontend dependencies and scripts in frontend/package.json
- [x] T005 [P] Configure Vite proxy in frontend/vite.config.ts
- [x] T006 [P] Add environment templates in backend/.env.example and frontend/.env.example

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T007 Create configuration loader in backend/src/config.py
- [x] T008 Create DuckDB connection module in backend/src/db/connection.py
- [x] T009 [P] Define database schema in backend/src/db/schema.sql
- [x] T010 Initialize database and migrations in backend/src/db/init_db.py
- [x] T011 [P] Define shared Pydantic schemas in backend/src/models/schemas.py
- [x] T012 Implement user seeding from env in backend/src/db/seed.py
- [x] T013 Implement PBKDF2 hashing/verify in backend/src/services/auth.py
- [x] T014 Implement simple session auth (in-memory token or signed cookie) in backend/src/services/auth.py
- [x] T015 Add auth dependencies in backend/src/api/deps.py
- [x] T016 Enable allow-all CORS and register routers in backend/src/app.py
- [x] T017 Add base API router and health endpoint in backend/src/api/router.py and backend/src/api/health.py
- [x] T018 Add error handling utilities in backend/src/api/errors.py
- [x] T019 Add simple auth routes in backend/src/api/auth_routes.py for /api/auth/login, /api/auth/logout, /api/auth/me (no complex auth)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Upload and Analyse Statement (Priority: P1) 🎯 MVP

**Goal**: Upload a statement, extract transactions via Azure OpenAI, store results, and show a monthly summary

**Independent Test**: Log in, upload a valid statement for a new month, and verify summary stats are shown for that month.

### Implementation for User Story 1

- [x] T020 [P] [US1] Create BankStatement model in backend/src/models/bank_statement.py
- [x] T021 [P] [US1] Create Transaction model in backend/src/models/transaction.py
- [x] T022 [US1] Implement statement storage logic in backend/src/services/statement_service.py
- [x] T023 [P] [US1] Implement file parsing helpers in backend/src/services/statement_parsers.py
- [x] T024 [P] [US1] Add PDF text extraction + fallback handling in backend/src/services/statement_parsers.py
- [x] T025 [US1] Implement Azure OpenAI extraction client in backend/src/services/ai_extraction.py
- [x] T026 [US1] Implement upload endpoint in backend/src/api/statement_routes.py (backend-only processing + DB storage)
- [x] T027 [US1] Implement summary aggregation in backend/src/services/summary_service.py
- [x] T028 [US1] Implement summary endpoint in backend/src/api/summary_routes.py
- [x] T029 [P] [US1] Build upload page in frontend/src/pages/UploadPage.tsx
- [x] T030 [P] [US1] Add upload/summary API calls in frontend/src/services/api.ts
- [x] T031 [P] [US1] Add replace/keep dialog in frontend/src/components/ReplaceDialog.tsx
- [x] T032 [US1] Build dashboard summary UI in frontend/src/pages/DashboardPage.tsx and frontend/src/components/SummaryCards.tsx

**Checkpoint**: User Story 1 is fully functional and testable independently

---

## Phase 4: User Story 2 - View Monthly Results (Priority: P2)

**Goal**: View detailed month/year stats, charts, and transactions

**Independent Test**: Select a month/year with saved data and verify detailed stats and charts are shown.

### Implementation for User Story 2

- [x] T033 [US2] Implement transactions query service in backend/src/services/transaction_service.py
- [x] T034 [US2] Implement transactions endpoint in backend/src/api/transaction_routes.py
- [x] T035 [P] [US2] Build monthly view page in frontend/src/pages/MonthlyViewPage.tsx
- [x] T036 [P] [US2] Add charts/table components in frontend/src/components/TransactionTable.tsx and frontend/src/components/TrendsChart.tsx
- [x] T037 [US2] Wire monthly view API calls in frontend/src/services/api.ts
- [x] T038 [US2] Add navbar navigation in frontend/src/components/NavBar.tsx and update routes in frontend/src/App.tsx

**Checkpoint**: User Stories 1 and 2 are both functional and testable independently

---

## Phase 5: User Story 3 - Basic Authentication (Priority: P3)

**Goal**: Provide a login UI and authenticated session handling for two local users

**Independent Test**: Log in with valid credentials and verify protected routes load; invalid credentials are rejected.

### Implementation for User Story 3

- [x] T039 [P] [US3] Add auth API calls in frontend/src/services/auth.ts
- [x] T040 [US3] Implement login page in frontend/src/pages/LoginPage.tsx
- [x] T041 [US3] Add auth provider and route guard in frontend/src/components/AuthProvider.tsx and frontend/src/components/ProtectedRoute.tsx
- [x] T042 [US3] Add logout and session handling in frontend/src/components/NavBar.tsx and frontend/src/App.tsx

**Checkpoint**: All user stories are functional and testable independently

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T043 [P] Add theme tokens and toggle in frontend/src/theme/theme.ts and frontend/src/components/ThemeToggle.tsx
- [x] T044 [P] Add loading/error states in frontend/src/components/LoadingState.tsx and frontend/src/components/ErrorBanner.tsx
- [x] T045 Update quickstart notes in specs/001-budget-tracker/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational phase completion
- **User Story 2 (P2)**: Depends on User Story 1 data being available
- **User Story 3 (P3)**: Depends on Foundational phase completion

### Within Each User Story

- Models before services
- Services before endpoints
- Backend endpoints before frontend integration
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel
- Foundational tasks marked [P] can run in parallel
- Within each user story, tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

- Task: "Create BankStatement model in backend/src/models/bank_statement.py"
- Task: "Create Transaction model in backend/src/models/transaction.py"
- Task: "Build upload page in frontend/src/pages/UploadPage.tsx"
- Task: "Add upload/summary API calls in frontend/src/services/api.ts"

---

## Parallel Example: User Story 2

- Task: "Build monthly view page in frontend/src/pages/MonthlyViewPage.tsx"
- Task: "Add charts/table components in frontend/src/components/TransactionTable.tsx and frontend/src/components/TrendsChart.tsx"

---

## Parallel Example: User Story 3

- Task: "Add auth API calls in frontend/src/services/auth.ts"
- Task: "Implement login page in frontend/src/pages/LoginPage.tsx"

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate by uploading a statement and confirming the monthly summary

### Incremental Delivery

1. Setup + Foundational
2. User Story 1 → Validate
3. User Story 2 → Validate
4. User Story 3 → Validate
5. Polish

### Parallel Team Strategy

With multiple developers:

1. Complete Setup + Foundational together
2. After Foundation:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
