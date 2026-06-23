import { Router } from "express";
import { validate } from "../middleware/validate.js";
import * as projectService from "../services/projectService.js";
import {
  createProjectSchema,
  projectIdParamSchema,
  updateProjectSchema,
} from "../validators/projectSchemas.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const projects = await projectService.listProjects();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validate(projectIdParamSchema, "params"), async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const project = await projectService.getProjectById(id);
    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.post("/", validate(createProjectSchema), async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  validate(projectIdParamSchema, "params"),
  validate(updateProjectSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params as { id: string };
      const project = await projectService.updateProject(id, req.body);
      res.json(project);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  validate(projectIdParamSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params as { id: string };
      await projectService.deleteProject(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
