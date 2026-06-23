import { Router } from "express";
import { validate } from "../middleware/validate.js";
import * as taskService from "../services/taskService.js";
import {
  createTaskSchema,
  taskIdParamSchema,
  taskQuerySchema,
  updateTaskSchema,
  type TaskQueryInput,
} from "../validators/taskSchemas.js";

const router = Router();

router.get("/", validate(taskQuerySchema, "query"), async (req, res, next) => {
  try {
    const tasks = await taskService.listTasks(req.query as TaskQueryInput);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validate(taskIdParamSchema, "params"), async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const task = await taskService.getTaskById(id);
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.post("/", validate(createTaskSchema), async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  validate(taskIdParamSchema, "params"),
  validate(updateTaskSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params as { id: string };
      const task = await taskService.updateTask(id, req.body);
      res.json(task);
    } catch (error) {
      next(error);
    }
  },
);

router.delete("/:id", validate(taskIdParamSchema, "params"), async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    await taskService.deleteTask(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
