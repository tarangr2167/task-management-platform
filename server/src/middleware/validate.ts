import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { AppError } from "../utils/errors.js";

type RequestPart = "body" | "query" | "params";

export function validate<T>(schema: ZodType<T>, part: RequestPart = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      const message = result.error.issues.map((issue) => issue.message).join(", ");
      next(new AppError(400, message));
      return;
    }

    req[part] = result.data as typeof req[typeof part];
    next();
  };
}
