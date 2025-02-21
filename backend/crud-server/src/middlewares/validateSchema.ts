import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { createError } from "@crud/middlewares/errorHandler";

export function validateSchema(schema: ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return next(
        createError(
          "ValidationError",
          error.details.map((e) => e.message).join(", ")
        )
      );
    }
    next();
  };
}
