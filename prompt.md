# AI-Assisted Workflow — [prompt.md](http://prompt.md)

This document describes how AI (Cursor + Claude) was used to build and deploy the Task Management Platform for the Vibe Coding assessment.

## Key Prompts & Decisions

### Initial planning

**Prompt:** Review assessment requirements and outline next steps without over-documenting upfront.

### Documentation style

**Prompt:** Don't document everything initially — add to `skills.md` and `README.md` step by step.

### Step 2 — Database

**Prompt:** Set up PostgreSQL with Prisma — schema, migrations, seed, health check.

### Step 3 — Backend API

**Prompt:** Build Projects CRUD, Tasks CRUD, Dashboard stats.

### Step 4 — Frontend

**Prompt:** Build Dashboard, Projects, Tasks pages connected to the API.

### Step 5 — Polish

**Prompt:** Final polish and submission-ready documentation.

**Prompt:** Make it responsive and add some annimation to make it look attractive.

### Step 6 — Deployment & Debugging

**Prompt:** Diagnose why the app worked locally but returned 404s/500s after deploying frontend to Vercel and backend to Render.

---

## What Worked Well

1. **Incremental docs** — `skills.md` stayed accurate because it grew with the code
2. **Step boundaries** — Backend before frontend avoided integration guesswork
3. **AI for boilerplate** — Prisma schema, route scaffolding, and CSS layout were fast to generate
4. **Human steering** — User chose doc style, step order, and when to skip ahead
5. **Systematic deployment debugging** — checking client, server, and environment variable configuration in isolation made it possible to separate "code" bugs from "configuration" bugs

---

## What I Verified Manually

- TypeScript builds for both `client` and `server`
- API health check reflects database connectivity
- CRUD flows: create project → add tasks → mark done → dashboard updates
- Delete cascade removes tasks when a project is deleted
- Production deployment: frontend (Vercel) successfully calling backend (Render) end-to-end after fixing the `/api` prefix and database connection string

---

