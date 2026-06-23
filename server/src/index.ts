import "dotenv/config";
import cors from "cors";
import express from "express";
import { prisma } from "./db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import dashboardRouter from "./routes/dashboard.js";
import projectsRouter from "./routes/projects.js";
import tasksRouter from "./routes/tasks.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "ok",
      message: "Task Management API is running",
      database: "connected",
    });
  } catch {
    res.status(503).json({
      status: "degraded",
      message: "API is running but the database is unavailable",
      database: "disconnected",
    });
  }
});

app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/dashboard", dashboardRouter);

app.use(errorHandler);

async function start() {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.warn("Database connection failed — start PostgreSQL and run npm run db:setup");
    console.warn(error);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start();
