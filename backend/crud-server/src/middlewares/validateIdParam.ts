import { Request, Response, NextFunction } from "express";

import { createError } from "@crud/middlewares/errorHandler";

export function validateIdParam(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  if (!id || typeof id !== "string" || id.trim() === "") {
    return next(createError("BadRequest", "Invalid or missing ID parameter"));
  }
  next();
}
