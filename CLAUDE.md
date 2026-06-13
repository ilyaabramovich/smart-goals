# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

SMART Goals is a full-stack app for creating and tracking SMART goals. The backend is a Rails 7 API (Ruby 4.0, PostgreSQL) and the frontend is a React 18 SPA (Vite, React Router v6). Both live in the same repo: Rails at the root, React under `client/`.

## Commands

### Backend (Rails)
```bash
bundle install          # install gems
rails db:migrate        # run migrations
rails db:seed           # seed optional sample data
rails s -p 3001         # start API server — must use port 3001
rspec                   # run all specs
rspec spec/models/goal_spec.rb   # run a single spec file
rubocop                 # lint
rubocop -a              # auto-correct lint
brakeman                # security scan
bundle audit            # dependency vulnerability check
```

### Frontend (from `client/`)
```bash
npm install             # install dependencies
npm run dev             # start dev server on port 3000
npm run test            # run Vitest tests
npm run lint            # ESLint
```

## Architecture

### Backend

- **API-only Rails app** (`ActionController::API`) with cookie-based session auth (`ActionController::Cookies`).
- Auth endpoints live at the root namespace (`/signup`, `/login`, `/logout`, `/me`). Goal/stat endpoints are namespaced under `/api/v1/`.
- **Models**: `User` → `has_many :goals` → `has_many :stats`. When a `Goal` is created, `GoalTimeFrameCalculationService` generates `Stat` records for each interval checkpoint between `created_at` and `target_date` (daily/weekly/monthly). Stats start with no `measurement_value`; a measured stat has one.
- **Stat lifecycle**: a stat is "due" when `measurement_date` is not in the future, "measured" when it has a value, "pending" when due but unmeasured, "upcoming" when still in the future.
- **Serializers**: `active_model_serializers` gem. Two goal serializers: `GoalSerializer` (list view) and `GoalDetailsSerializer` (detail view, includes computed fields like `accumulated_value`, `completion_percentage`, `measurement_values`/`measurement_dates` for chart rendering).
- **Services**: `BaseService` pattern in `app/services/`. Services expose a single `call` method.
- **Tests**: RSpec + FactoryBot + Shoulda-Matchers. Factories in `spec/factories/`. `SessionHelpers` in `spec/support/` provides `log_in(user)` for controller specs. Tests use transactional fixtures.

### Frontend

- **Dev proxy**: Vite proxies `/api/*` → `http://localhost:3001` and `/auth/*` → `http://localhost:3001` (stripping `/auth` prefix). Configured via `client/.env.local`.
- **Routing**: React Router v6 data API — routes define `loader` and `action` functions co-located on the route component as static properties. All goal routes are wrapped in `<ProtectedRoute>` which guards unauthenticated access.
- **Auth**: `AuthProvider` (`client/src/providers/auth.jsx`) wraps the app and exposes `{ user, signin, signup, logout, isLoggedIn }` via `AuthContext`. Access with the `useAuth` hook.
- **API layer**: `client/src/api/` — three modules (`auth.js`, `goals.js`, `stats.js`) that call the Rails backend. Goal/stat write requests pass data through `deepSnakeCase()` to convert camelCase keys to snake_case before sending to Rails.
- **Tests**: Vitest + Testing Library, configured in `vite.config.js`. Test setup in `client/src/test/setup.js`. Utils have `.test.js` co-located tests.

## Key conventions

- Controllers scope all goal/stat queries through `current_user` to enforce ownership (e.g., `current_user.goals.find(params[:id])`).
- RuboCop enforces `Style/ClassAndModuleChildren: compact` — use `class Api::V1::GoalsController` not nested `module` blocks.
- Line length max is 120. `Style/FrozenStringLiteralComment` is disabled.
- Frontend camelCase ↔ backend snake_case conversion is handled entirely client-side via `deepSnakeCase` on writes; Rails returns snake_case which the frontend uses as-is.
