# Task Management Platform — Project Knowledge Base

> Detailed project memory. Updated step by step as features are built — not filled in upfront.

---

## Project Overview

Task Management Platform for the Vibe Coding assessment.

Users will manage **Projects** and **Tasks**, and view a **Dashboard** with summary stats. Backend API is complete; frontend is next.

---

## Technologies

| Layer    | Choice     | Notes              |
| -------- | ---------- | ------------------ |
| Frontend | React 19   | Vite, TypeScript   |
| Backend  | Express 5  | Node.js, TypeScript |
| Validation | Zod      | Request validation at API boundary |
| Database | PostgreSQL | Connected via Prisma |
| ORM      | Prisma     | Schema, migrations, seed |

---

## Project Structure

```
task-management-platform/
├── client/
│   └── src/
│       ├── App.tsx          # Placeholder UI
│       ├── main.tsx
│       └── index.css
├── server/
│   ├── .env.example
│   ├── prisma/
│   │   ├── schema.prisma    # Project & Task models
│   │   ├── seed.ts          # Sample data
│   │   └── migrations/
│   └── src/
│       ├── index.ts         # Express bootstrap
│       ├── db.ts            # Prisma client singleton
│       ├── routes/          # projects, tasks, dashboard
│       ├── services/        # Business logic
│       ├── validators/      # Zod schemas
│       ├── middleware/      # validate, errorHandler
│       └── utils/
├── skills.md
├── prompt.md
└── README.md
```

---

## Backend Structure

```
server/src/
├── index.ts              # App bootstrap, route mounting
├── db.ts                 # Prisma client singleton
├── routes/
│   ├── projects.ts
│   ├── tasks.ts
│   └── dashboard.ts
├── services/
│   ├── projectService.ts
│   ├── taskService.ts
│   └── dashboardService.ts
├── validators/
│   ├── projectSchemas.ts
│   └── taskSchemas.ts
├── middleware/
│   ├── validate.ts
│   └── errorHandler.ts
└── utils/
    └── errors.ts
```

Request flow: `route → validate (Zod) → service → Prisma → PostgreSQL`

Errors return JSON: `{ "error": "message" }`

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

### Health

| Method | Path | Description |
| ------ | ---- | ----------- |
| `GET` | `/health` | API + database status |

### Projects

| Method | Path | Description |
| ------ | ---- | ----------- |
| `GET` | `/projects` | List all projects (with task count) |
| `GET` | `/projects/:id` | Get project with its tasks |
| `POST` | `/projects` | Create project |
| `PUT` | `/projects/:id` | Update project |
| `DELETE` | `/projects/:id` | Delete project |

**Create body:** `{ "name": "...", "description": "..." }`

### Tasks

| Method | Path | Description |
| ------ | ---- | ----------- |
| `GET` | `/tasks` | List tasks (optional `?projectId=&status=&priority=`) |
| `GET` | `/tasks/:id` | Get one task |
| `POST` | `/tasks` | Create task |
| `PUT` | `/tasks/:id` | Update task |
| `DELETE` | `/tasks/:id` | Delete task |

**Create body:** `{ "projectId": "uuid", "title": "...", "description": "...", "priority": "HIGH", "status": "OPEN" }`

### Dashboard

| Method | Path | Description |
| ------ | ---- | ----------- |
| `GET` | `/dashboard/stats` | `{ totalProjects, totalTasks, completedTasks, completionPercentage }` |

---

## Validation Rules

| Resource | Field | Rules |
| -------- | ----- | ----- |
| Project | `name` | Required, 1–200 chars |
| Project | `description` | Optional, max 2000 chars |
| Task | `projectId` | Required UUID, must exist |
| Task | `title` | Required, 1–300 chars |
| Task | `description` | Optional, max 2000 chars |
| Task | `priority` | `LOW` \| `MEDIUM` \| `HIGH` |
| Task | `status` | `OPEN` \| `DONE` |

---

## Entity Relationships

```
Project (1) ──────< Task (N)
```

| Entity  | Fields |
| ------- | ------ |
| Project | `id`, `name`, `description?`, `createdAt` |
| Task    | `id`, `projectId`, `title`, `description?`, `priority`, `status`, `createdAt` |

- `Task.projectId` references `Project.id`
- Deleting a project deletes all its tasks (`ON DELETE CASCADE`)

**Priority:** `LOW`, `MEDIUM`, `HIGH` (default `MEDIUM`)

**Status:** `OPEN`, `DONE` (default `OPEN`)

---

## Frontend Structure

```
client/src/
├── App.tsx       # Placeholder landing page
├── main.tsx      # React entry
└── index.css     # Global styles (dark theme)
```

---

## Assumptions

- Monorepo with separate `client/` and `server/` packages
- Frontend and backend run as separate dev processes
- No authentication in the initial scope

---

## Changelog

| Step | What was added |
| ---- | -------------- |
| 1    | Project scaffold, this file, README |
| 2    | Prisma schema, migrations, seed data, DB health check |
| 3    | Projects, Tasks, Dashboard REST APIs + Zod validation |

---

*Frontend sections will be added in Step 4.*
