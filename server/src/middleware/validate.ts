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

    req.validated ??= {};
    req.validated[part] = result.data;
    next();
  };
}

export function getValidated<T>(req: Request, part: RequestPart): T {
  return req.validated?.[part] as T;
}
