import { Router } from "express";
import * as dashboardService from "../services/dashboardService.js";

const router = Router();

router.get("/stats", async (_req, res, next) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

export default router;
