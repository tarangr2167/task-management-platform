# Task Management Platform

A lightweight full-stack task management app for the Vibe Coding assessment.

## Tech Stack

| Layer    | Technology              |
| -------- | ----------------------- |
| Frontend | React, TypeScript, Vite |
| Backend  | Node.js, Express        |
| Database | PostgreSQL, Prisma      |

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

### Database (first time)

```bash
# Create the database in PostgreSQL
CREATE DATABASE task_management;

cd server
cp .env.example .env   # adjust DATABASE_URL if needed
npm install
npm run db:setup       # migrate + seed
```

### Client

```bash
cd client
npm install
npm run dev
```

→ `http://localhost:5173`

### Server

```bash
cd server
npm install
npm run db:setup   # first time only
npm run dev
```

→ `http://localhost:3000`

Health check: `GET http://localhost:3000/api/health` (includes database status)

## License

MIT
