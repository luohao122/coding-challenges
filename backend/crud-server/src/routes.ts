import { Application } from "express";

import { healthRoutes } from "@crud/routes/health";
import { postRoutes } from "@crud/routes/post";

const BLOG_BASE_PATH = "/api/v1/blog";

export function appRoutes(app: Application) {
  app.use("", healthRoutes());

  app.use(BLOG_BASE_PATH, postRoutes());
}
