import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { logger } from "@crud/logger/logger";
import { createError } from "@crud/middlewares/errorHandler";
import { getAllPosts, getPostById } from "@crud/services/post.service";

export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const filterTitle = req.query.filterTitle as string;
    const orderBy = req.query.orderBy as string;
    const sortDirection = req.query.sortDirection as "ASC" | "DESC";

    const { results, totalCount } = await getAllPosts({
      page,
      limit,
      filterTitle,
      orderBy,
      sortDirection,
    });

    const responsePayload = {
      message: "Fetched posts successfully",
      data: results,
      meta: {
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      },
    };

    // Return the fresh data
    res.status(StatusCodes.OK).json(responsePayload);
    return;
  } catch (err) {
    logger.error(`getPosts() method error:`, err);
    return next(err);
  }
}

export async function getSinglePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const post = await getPostById(id);
    if (!post) {
      return next(
        createError("NotFoundError", `Failed to find post with id: ${id}`)
      );
    }

    res.status(StatusCodes.OK).json({
      message: "Fetched post successfully",
      data: {
        post,
      },
    });
  } catch (err) {
    logger.error(`getPosts() method error:`, err);
    return next(err);
  }
}
