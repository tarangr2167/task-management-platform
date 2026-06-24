# Task Management Platform

A lightweight full-stack task management app for the Vibe Coding assessment.

## Tech Stack


| Layer    | Technology                            |
| -------- | ------------------------------------- |
| Frontend | React, TypeScript, Vite, React Router |
| Backend  | Node.js, Express, Zod                 |
| Database | PostgreSQL, Prisma                    |


## Deployment

The application has been deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** PostgreSQL hosted on Render

During deployment, I configured environment variables, database connectivity, and production builds for both frontend and backend services to ensure end-to-end communication between the applications.

## Features

### Dashboard

- View total projects and tasks
- Track completed tasks
- See overall completion percentage with a progress bar

### Project Management

- Create new projects
- Edit project details
- Search projects
- Delete projects
- View tasks associated with a project

### Task Management

- Create and update tasks
- Filter tasks by project, status, and priority
- Mark tasks as completed
- Delete tasks

### User Experience

- Toast notifications for actions and errors
- Loading states during API requests
- Database connection status indicator
- Responsive dark-themed interface

## Project Structure

```text
task-management-platform/
├── client/          # React frontend
├── server/          # Express backend
├── skills.md        # Development notes and decisions
├── prompt.md        # AI-assisted workflow documentation
└── README.md

```

## Running the Project Locally

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm 10+

### Database Setup

```bash
CREATE DATABASE task_management;

```

```bash
cd server
cp .env.example .env
npm install
npm run db:setup

```

Update the `DATABASE_URL` inside `.env` if required.

### Start the Backend

```bash
cd server
npm run dev

```

The API will be available at:

```text
http://localhost:3000

```

### Start the Frontend

```bash
cd client
npm install
npm run dev

```

The frontend will be available at:

```text
http://localhost:5173

```

Create a `.env` file inside the client directory:

```env
VITE_API_URL=http://localhost:3000/api

```

## Deployment Notes

### Backend (Render)

The backend is deployed on Render and connected to a managed PostgreSQL database.

Environment variables:

```env
DATABASE_URL=<postgres-connection-string>
PORT=3000

```

Build command:

```bash
npm install && npm run build && npm run db:setup

```

Start command:

```bash
npm start

```

### Frontend (Vercel)

The frontend is deployed on Vercel.

Environment variable:

```env
VITE_API_URL=https://<backend-url>/api

```

After updating environment variables, a redeployment is required because Vite injects them during the build process.

## API Endpoints

Base URL:

```text
http://localhost:3000/api

```


| Method             | Endpoint         | Description                   |
| ------------------ | ---------------- | ----------------------------- |
| GET                | /health          | Check API and database status |
| GET / POST         | /projects        | List or create projects       |
| GET / PUT / DELETE | /projects/:id    | Manage a project              |
| GET / POST         | /tasks           | List or create tasks          |
| GET / PUT / DELETE | /tasks/:id       | Manage a task                 |
| GET                | /dashboard/stats | Dashboard statistics          |


## Documentation

Additional project documentation can be found in:

- `skills.md` – architecture decisions, implementation notes, and deployment learnings
- `prompt.md` – AI-assisted development workflow and key prompts used during the project

## Build for Production

```bash
# Backend
cd server
npm run build
npm start

# Frontend
cd client
npm run build
npm run preview

```

## License

MIT