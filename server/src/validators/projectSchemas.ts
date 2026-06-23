import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  description: z.string().trim().max(2000).optional().nullable(),
});

export const updateProjectSchema = createProjectSchema
  .partial()
  .refine((data) => data.name !== undefined || data.description !== undefined, {
    message: "At least one field is required",
  });

export const projectIdParamSchema = z.object({
  id: z.string().uuid("Invalid project id"),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
