import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { createError } from "@crud/middlewares/errorHandler";
import {
  getPostById,
  updatePost as updateSinglePost,
} from "@crud/services/post.service";
import { logger } from "@crud/logger/logger";

export async function updatePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    // Reject empty request bodies
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(createError("BadRequest", "Request body cannot be empty"));
    }

    const post = await getPostById(id);
    if (!post) {
      return next(
        createError("NotFoundError", `Failed to find post with id: ${id}`)
      );
    }

    await updateSinglePost(id, req.body);

    res
      .status(StatusCodes.OK)
      .json({ message: "Post has been updated successfully" });
  } catch (err) {
    logger.error(`updatePost() method error:`, err);
    next(err);
  }
}
