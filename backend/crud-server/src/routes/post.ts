import express from "express";

import { createPost } from "@crud/controllers/post/create";
import { getPosts, getSinglePost } from "@crud/controllers/post/get";
import { validateSchema } from "@crud/middlewares/validateSchema";

import { createPostSchema } from "@crud/schemes/createPost";
import { validateIdParam } from "@crud/middlewares/validateIdParam";
import { updatePost } from "@crud/controllers/post/update";

import { deletePost } from "@crud/controllers/post/delete";
import { updatePostSchema } from "@crud/schemes/updatePost";

const router = express.Router();

export function postRoutes() {
  router.get("/posts", getPosts);
  router.get("/posts/:id", validateIdParam, getSinglePost);

  router.post("/posts", validateSchema(createPostSchema), createPost);

  router.put(
    "/posts/:id",
    validateIdParam,
    validateSchema(updatePostSchema),
    updatePost
  );
  router.delete("/posts/:id", validateIdParam, deletePost);

  return router;
}
