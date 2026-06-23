import { prisma } from "../db.js";
import { AppError } from "../utils/errors.js";
import type {
  CreateTaskInput,
  TaskQueryInput,
  UpdateTaskInput,
} from "../validators/taskSchemas.js";

export async function listTasks(filters: TaskQueryInput) {
  return prisma.task.findMany({
    where: {
      ...(filters.projectId && { projectId: filters.projectId }),
      ...(filters.status && { status: filters.status }),
      ...(filters.priority && { priority: filters.priority }),
    },
    orderBy: { createdAt: "desc" },
    include: {
      project: { select: { id: true, name: true } },
    },
  });
}

export async function getTaskById(id: string) {
  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      project: { select: { id: true, name: true } },
    },
  });

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  return task;
}

export async function createTask(input: CreateTaskInput) {
  const project = await prisma.project.findUnique({
    where: { id: input.projectId },
    select: { id: true },
  });

  if (!project) {
    throw new AppError(400, "Project not found");
  }

  return prisma.task.create({
    data: {
      projectId: input.projectId,
      title: input.title,
      description: input.description ?? null,
      ...(input.priority && { priority: input.priority }),
      ...(input.status && { status: input.status }),
    },
    include: {
      project: { select: { id: true, name: true } },
    },
  });
}

export async function updateTask(id: string, input: UpdateTaskInput) {
  if (input.projectId) {
    const project = await prisma.project.findUnique({
      where: { id: input.projectId },
      select: { id: true },
    });

    if (!project) {
      throw new AppError(400, "Project not found");
    }
  }

  try {
    return await prisma.task.update({
      where: { id },
      data: {
        ...(input.projectId !== undefined && { projectId: input.projectId }),
        ...(input.title !== undefined && { title: input.title }),
        ...(input.description !== undefined && {
          description: input.description ?? null,
        }),
        ...(input.priority !== undefined && { priority: input.priority }),
        ...(input.status !== undefined && { status: input.status }),
      },
      include: {
        project: { select: { id: true, name: true } },
      },
    });
  } catch {
    throw new AppError(404, "Task not found");
  }
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({ where: { id } });
  } catch {
    throw new AppError(404, "Task not found");
  }
}
