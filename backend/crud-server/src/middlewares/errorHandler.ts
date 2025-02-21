import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { logger } from "@crud/logger/logger";

export function createError(name: string, message: string) {
  const error = new Error(message);
  error.name = name;
  return error;
}

export const errorHandler = (
  err: Error & { details?: string[] },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err.message);

  const errorResponse = {
    error: {
      name: err.name,
      message: err.message,
      details: err.details || [],
    },
  };

  // Handle validation error from joi or server's, respond with 400
  switch (err.name) {
    case "ValidationError":
      return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);

    case "ServerError":
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);

    case "BadRequest":
      return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);

    case "UnauthorizedError":
      return res.status(StatusCodes.UNAUTHORIZED).json(errorResponse);

    case "ForbiddenError":
      return res.status(StatusCodes.FORBIDDEN).json(errorResponse);

    case "NotFoundError":
      return res.status(StatusCodes.NOT_FOUND).json(errorResponse);
    // Otherwise, fallback to a 500
    default:
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};
