import { prisma } from "../db.js";

export async function getDashboardStats() {
  const [totalProjects, totalTasks, completedTasks] = await Promise.all([
    prisma.project.count(),
    prisma.task.count(),
    prisma.task.count({ where: { status: "DONE" } }),
  ]);

  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return {
    totalProjects,
    totalTasks,
    completedTasks,
    completionPercentage,
  };
}
