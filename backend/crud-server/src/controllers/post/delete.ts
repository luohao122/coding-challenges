import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import { createError } from "@crud/middlewares/errorHandler";
import { getPostById, removePost } from "@crud/services/post.service";
import { logger } from "@crud/logger/logger";

export async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const post = await getPostById(id);
    if (!post) {
      return next(
        createError("NotFoundError", `Failed to find post with id: ${id}`)
      );
    }

    await removePost(id);

    res
      .status(StatusCodes.OK)
      .json({ message: "Post has been deleted successfully" });
  } catch (err) {
    logger.error(`deletePost() method error:`, err);
    next(err);
  }
}
