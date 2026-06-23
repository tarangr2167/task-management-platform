import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { isAppError } from "../utils/errors.js";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (isAppError(error)) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Resource not found" });
      return;
    }

    if (error.code === "P2003") {
      res.status(400).json({ error: "Related resource not found" });
      return;
    }
  }

  console.error(error);
  res.status(500).json({ error: "Internal server error" });
}
