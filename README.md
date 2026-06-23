# Task Management Platform

A lightweight full-stack task management app for the Vibe Coding assessment.

## Tech Stack

| Layer    | Technology                        |
| -------- | --------------------------------- |
| Frontend | React, TypeScript, Vite, React Router |
| Backend  | Node.js, Express, Zod             |
| Database | PostgreSQL, Prisma                |

## Features

- **Dashboard** — total projects, tasks, completed tasks, completion % with progress bar
- **Projects** — create, search, edit, delete; view tasks per project
- **Tasks** — filter by project, status, priority; toggle status; delete
- **UI polish** — toast notifications, loading states, database status indicator

## Project Structure

```
task-management-platform/
├── client/          # React frontend
├── server/          # Express API
├── skills.md        # Project knowledge base
├── prompt.md        # AI workflow documentation
└── README.md
```

## Getting Started

**Prerequisites:** Node.js 20+, PostgreSQL 15+, npm 10+

### 1. Database setup (first time)

```bash
# In PostgreSQL
CREATE DATABASE task_management;

cd server
cp .env.example .env   # adjust DATABASE_URL if needed
npm install
npm run db:setup       # migrate + seed sample data
```

### 2. Start the server

```bash
cd server
npm run dev
```

→ `http://localhost:3000`

### 3. Start the client

```bash
cd client
npm install
npm run dev
```

→ `http://localhost:5173`

The client proxies `/api` requests to the backend during development.

## API Overview

Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
| ------ | -------- | ------------- |
| GET | `/health` | API + DB status |
| GET/POST | `/projects` | List / create projects |
| GET/PUT/DELETE | `/projects/:id` | Project CRUD |
| GET/POST | `/tasks` | List / create tasks |
| GET/PUT/DELETE | `/tasks/:id` | Task CRUD |
| GET | `/dashboard/stats` | Dashboard metrics |

See `skills.md` for validation rules and architecture details.

## Assessment Deliverables

| Deliverable | Location | Status |
| ----------- | -------- | ------ |
| Source code | `/client`, `/server` | Complete |
| `skills.md` | Project root | Complete |
| `prompt.md` | Project root | Complete |
| `README.md` | Project root | Complete |

## Build for Production

```bash
cd server && npm run build && npm start
cd client && npm run build && npm run preview
```

## License

MIT
