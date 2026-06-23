import { prisma } from "../db.js";
import { AppError } from "../utils/errors.js";
import type { CreateProjectInput, UpdateProjectInput } from "../validators/projectSchemas.js";

export async function listProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { tasks: true } },
    },
  });
}

export async function getProjectById(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tasks: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  return project;
}

export async function createProject(input: CreateProjectInput) {
  return prisma.project.create({
    data: {
      name: input.name,
      description: input.description ?? null,
    },
  });
}

export async function updateProject(id: string, input: UpdateProjectInput) {
  try {
    return await prisma.project.update({
      where: { id },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.description !== undefined && {
          description: input.description ?? null,
        }),
      },
    });
  } catch {
    throw new AppError(404, "Project not found");
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } });
  } catch {
    throw new AppError(404, "Project not found");
  }
}
