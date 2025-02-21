import express from "express";

import { health } from "@crud/controllers/health";

const router = express.Router();

export function healthRoutes() {
  router.get("/health", health);

  return router;
}
