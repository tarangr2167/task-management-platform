import { z } from "zod";

const priorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);
const statusEnum = z.enum(["OPEN", "DONE"]);

export const createTaskSchema = z.object({
  projectId: z.string().uuid("Invalid project id"),
  title: z.string().trim().min(1, "Title is required").max(300),
  description: z.string().trim().max(2000).optional().nullable(),
  priority: priorityEnum.optional(),
  status: statusEnum.optional(),
});

export const updateTaskSchema = z
  .object({
    projectId: z.string().uuid("Invalid project id").optional(),
    title: z.string().trim().min(1, "Title cannot be empty").max(300).optional(),
    description: z.string().trim().max(2000).optional().nullable(),
    priority: priorityEnum.optional(),
    status: statusEnum.optional(),
  })
  .refine(
    (data) =>
      data.projectId !== undefined ||
      data.title !== undefined ||
      data.description !== undefined ||
      data.priority !== undefined ||
      data.status !== undefined,
    { message: "At least one field is required" },
  );

export const taskIdParamSchema = z.object({
  id: z.string().uuid("Invalid task id"),
});

export const taskQuerySchema = z.object({
  projectId: z.string().uuid("Invalid project id").optional(),
  status: statusEnum.optional(),
  priority: priorityEnum.optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskQueryInput = z.infer<typeof taskQuerySchema>;
