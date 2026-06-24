# Task Management Platform — Project Knowledge Base

> Detailed project memory. Updated step by step as features are built.

---

## Project Overview

Task Management Platform for the Vibe Coding assessment.

Users manage **Projects** and **Tasks**, and view a **Dashboard** with summary stats. Full stack is complete and ready for submission.

---

## Technologies


| Layer      | Choice     | Notes                          |
| ---------- | ---------- | ------------------------------ |
| Frontend   | React 19   | Vite, TypeScript, React Router |
| Backend    | Express 5  | Node.js, TypeScript            |
| Validation | Zod        | API request validation         |
| Database   | PostgreSQL | Connected via Prisma           |
| ORM        | Prisma     | Schema, migrations, seed       |


---

## Project Structure

```
task-management-platform/
├── client/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/         # Toast notifications
│       ├── pages/
│       ├── types/
│       ├── App.tsx
│       └── index.css
├── server/
│   ├── prisma/
│   └── src/
│       ├── routes/
│       ├── services/
│       ├── validators/
│       └── middleware/
├── skills.md
├── prompt.md
└── README.md
```

---

## Architecture Decisions

- The project uses a monorepo structure with separate `client` and `server` folders to keep frontend and backend concerns isolated.
- The backend follows a layered approach: routes → validation → services → database access.
- Zod is used to validate incoming requests before they reach business logic.
- Prisma handles database access, migrations, and type-safe queries.
- All API endpoints are grouped under the `/api` prefix.
- Environment variables are used for configuration so the same codebase works locally and in production.

---

## Business Rules

- A project must have a name; description is optional.
- A task must belong to a project and have a title.
- New tasks default to `MEDIUM` priority and `OPEN` status.
- Deleting a project automatically removes all associated tasks.
- Dashboard completion percentage is shown as `0%` when no tasks exist.
- Tasks can be filtered by project, priority, and status.

---

## Backend Structure

```
server/src/
├── index.ts
├── db.ts
├── routes/       projects, tasks, dashboard
├── services/     projectService, taskService, dashboardService
├── validators/   Zod schemas
└── middleware/   validate, errorHandler
```

Request flow: `route → validate → service → Prisma → PostgreSQL`

**Database scripts:** `db:setup`, `db:migrate`, `db:seed`, `db:reset`

---

## Frontend Structure

```
client/src/
├── api/              client.ts, projects.ts, tasks.ts
├── components/       Layout, StatCard, badges, LoadingSpinner, ProgressBar
├── context/          ToastContext
├── pages/            Dashboard, Projects, ProjectDetail, Tasks
└── types/
```

**Routes:**


| Path            | Page           | Purpose                             |
| --------------- | -------------- | ----------------------------------- |
| `/`             | Dashboard      | Stats + completion progress bar     |
| `/projects`     | Projects       | List, search, create, delete        |
| `/projects/:id` | Project detail | Edit project, manage tasks          |
| `/tasks`        | Tasks          | Filter by project, status, priority |


**UI extras (Step 5):** toast notifications, loading spinners, project search, edit project, DB status in sidebar

**API calls:** Vite dev proxy forwards `/api` → `http://localhost:3000`

---

## Business Rules

- Project `name` is required; `description` is optional
- Task `title` and `projectId` are required; `description` is optional
- Task defaults: `priority = MEDIUM`, `status = OPEN`
- Deleting a project deletes all its tasks (cascade)
- Dashboard completion % is `0` when there are no tasks

---

## API Endpoints

Base URL: `http://localhost:3000/api`


| Method         | Path               | Description            |
| -------------- | ------------------ | ---------------------- |
| GET            | `/health`          | API + DB status        |
| GET/POST       | `/projects`        | List / create          |
| GET/PUT/DELETE | `/projects/:id`    | Read / update / delete |
| GET/POST       | `/tasks`           | List / create          |
| GET/PUT/DELETE | `/tasks/:id`       | Read / update / delete |
| GET            | `/dashboard/stats` | Dashboard metrics      |


Task list filters: `?projectId=&status=&priority=`

---

## Entity Relationships

```
Project (1) ──────< Task (N)
```


| Entity  | Fields                                                                        |
| ------- | ----------------------------------------------------------------------------- |
| Project | `id`, `name`, `description?`, `createdAt`                                     |
| Task    | `id`, `projectId`, `title`, `description?`, `priority`, `status`, `createdAt` |


**Priority:** `LOW`, `MEDIUM`, `HIGH` · **Status:** `OPEN`, `DONE`

---

## Validation Rules


| Resource | Field       | Rules                     |
| -------- | ----------- | ------------------------- |
| Project  | `name`      | Required, 1–200 chars     |
| Task     | `title`     | Required, 1–300 chars     |
| Task     | `projectId` | Required UUID, must exist |
| Task     | `priority`  | `LOW`                     |
| Task     | `status`    | `OPEN`                    |


---

## Assumptions

- Monorepo with separate `client/` and `server/` packages
- Frontend and backend run as separate dev processes
- No authentication in MVP scope

---

## Future Extension Notes

- User authentication (JWT or sessions)
- Task due dates and overdue dashboard count
- Kanban board view with drag-and-drop
- Pagination on list endpoints
- Real-time updates via WebSocket

---

## Changelog


| Step | What was added                                                                   |
| ---- | -------------------------------------------------------------------------------- |
| 1    | Project setup, skills.md, README                                                 |
| 2    | Prisma schema, migrations, seed, DB health check                                 |
| 3    | Projects, Tasks, Dashboard REST APIs + Zod validation                            |
| 4    | React frontend — Dashboard, Projects, Tasks pages                                |
| 5    | Toasts, loading states, progress bar, project search/edit, prompt.md, final docs |


