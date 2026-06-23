# Task Management Platform — Project Knowledge Base

> Detailed project memory. Updated step by step as features are built — not filled in upfront.

---

## Project Overview

Task Management Platform for the Vibe Coding assessment.

Users will manage **Projects** and **Tasks**, and view a **Dashboard** with summary stats. Work is in progress — only the initial scaffold exists today.

---

## Technologies

| Layer    | Choice     | Notes              |
| -------- | ---------- | ------------------ |
| Frontend | React 19   | Vite, TypeScript   |
| Backend  | Express 5  | Node.js, TypeScript |
| Database | PostgreSQL | Not connected yet  |

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
│   └── src/
│       └── index.ts         # Express app + health route
├── skills.md
├── prompt.md
└── README.md
```

---

## Backend Structure

```
server/src/index.ts
```

- Express with CORS and JSON body parsing
- `GET /api/health` — returns `{ status, message }`

**Environment variables** (`.env.example`):

| Variable       | Default | Description        |
| -------------- | ------- | ------------------ |
| `PORT`         | `3000`  | API port           |
| `DATABASE_URL` | —       | Reserved for later |

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

---

*Next sections (Business Rules, Entity Relationships, API Endpoints, Validation Rules, etc.) will be added when we build each feature.*
