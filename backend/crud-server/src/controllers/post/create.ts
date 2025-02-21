import { NextFunction, Request, Response } from "express";
import slugify from "slugify";
import { StatusCodes } from "http-status-codes";

import { createNewPost } from "@crud/services/post.service";
import { INewPostDocument, IPostDocument } from "@crud/types/post.interface";
import { logger } from "@crud/logger/logger";

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, slug, content, coverImage } = req.body;
  const generatedSlug = slug || slugify(title, { lower: true, strict: true });

  const postData: INewPostDocument = {
    title,
    slug: generatedSlug,
    content,
    coverImage: coverImage || "",
  };

  try {
    const newPost = (await createNewPost(postData)) as IPostDocument;
    res.status(StatusCodes.CREATED).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (err) {
    logger.error(`createPost() method error`, err);
    next(err);
  }
}
