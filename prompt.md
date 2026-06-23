# AI-Assisted Workflow — prompt.md

This document describes how AI (Cursor) was used to build the Task Management Platform for the Vibe Coding assessment.

---

## Approach

Development followed a **step-by-step workflow** with documentation updated after each step — not filled in upfront.

| Step | Focus | AI role |
| ---- | ----- | ------- |
| 1 | Scaffold + `skills.md` / `README.md` | Plan structure, create minimal docs |
| 2 | Database (Prisma, migrations, seed) | Schema design, migration setup |
| 3 | Backend REST API | Routes, services, Zod validation |
| 4 | React frontend | Pages, API integration, routing |
| 5 | Polish + final docs | UI extras, `prompt.md`, doc review |

---

## Key Prompts & Decisions

### Initial planning

**Prompt:** Review assessment requirements and outline next steps without over-documenting upfront.

**Outcome:** Agreed on monorepo layout (`client/` + `server/`), incremental `skills.md`, and a 5-step build order.

### Documentation style

**Prompt:** Don't document everything initially — add to `skills.md` and `README.md` step by step.

**Outcome:** Each step only added docs for what was built. Avoided stale "planned" sections.

### Step 2 — Database

**Prompt:** Set up PostgreSQL with Prisma — schema, migrations, seed, health check.

**AI decisions:**
- Prisma for type-safe queries and enum support
- UUID primary keys
- Cascade delete on project → tasks
- Seed script with 2 sample projects

### Step 3 — Backend API

**Prompt:** Build Projects CRUD, Tasks CRUD, Dashboard stats.

**AI decisions:**
- Layered architecture: routes → validators → services → Prisma
- Zod for request validation
- Consistent error format: `{ "error": "message" }`
- Task list filters via query params

### Step 4 — Frontend

**Prompt:** Build Dashboard, Projects, Tasks pages connected to the API.

**AI decisions:**
- React Router for navigation
- Vite proxy for `/api` in development
- Dark theme UI with reusable badges and stat cards
- Project detail page for task management per project

### Step 5 — Polish

**Prompt:** Final polish and submission-ready documentation.

**AI additions:**
- Toast notifications for user feedback
- Loading spinners and progress bar on dashboard
- Project search on list page
- Edit project on detail page
- Database status indicator in sidebar
- Final sync of `skills.md`, `README.md`, and this file

---

## What Worked Well

1. **Incremental docs** — `skills.md` stayed accurate because it grew with the code
2. **Step boundaries** — Backend before frontend avoided integration guesswork
3. **AI for boilerplate** — Prisma schema, route scaffolding, and CSS layout were fast to generate
4. **Human steering** — User chose doc style, step order, and when to skip ahead

---

## What I Verified Manually

- TypeScript builds for both `client` and `server`
- API health check reflects database connectivity
- CRUD flows: create project → add tasks → mark done → dashboard updates
- Delete cascade removes tasks when a project is deleted

---

## If Continuing This Project

Use `skills.md` as the source of truth. Suggested next features:

- User authentication
- Task due dates
- Kanban board view
- Pagination on list endpoints

Update `skills.md` when adding any of the above.
