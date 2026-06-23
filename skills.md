# Task Management Platform — Project Knowledge Base

> Detailed project memory. Updated step by step as features are built — not filled in upfront.

---

## Project Overview

Task Management Platform for the Vibe Coding assessment.

Users will manage **Projects** and **Tasks**, and view a **Dashboard** with summary stats. Database layer is in place; API and UI are next.

---

## Technologies

| Layer    | Choice     | Notes              |
| -------- | ---------- | ------------------ |
| Frontend | React 19   | Vite, TypeScript   |
| Backend  | Express 5  | Node.js, TypeScript |
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
│       ├── index.ts         # Express app + health route
│       └── db.ts            # Prisma client singleton
├── skills.md
├── prompt.md
└── README.md
```

---

## Backend Structure

```
server/src/
├── index.ts    # Express app, DB health check
└── db.ts       # Prisma client singleton

server/prisma/
├── schema.prisma
├── seed.ts
└── migrations/
```

- Express with CORS and JSON body parsing
- `GET /api/health` — returns API status and database connectivity

**Environment variables** (`.env.example`):

| Variable       | Default | Description                   |
| -------------- | ------- | ----------------------------- |
| `PORT`         | `3000`  | API port                      |
| `DATABASE_URL` | —       | PostgreSQL connection string  |

**Database scripts** (`server/package.json`):

| Script | Purpose |
| ------ | ------- |
| `npm run db:setup` | Run migrations + seed |
| `npm run db:migrate` | Apply migrations only |
| `npm run db:seed` | Insert sample data |
| `npm run db:reset` | Reset DB, migrate, and seed |

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

---

*Next sections (Business Rules, API Endpoints, Validation Rules, etc.) will be added when we build each feature.*
