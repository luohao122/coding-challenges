import express from "express";

import { start } from "@crud/server";
import { databaseConnection } from "@crud/sqlite-connection/database";

const startApp = () => {
  // Connect to DB
  databaseConnection();

  const app = express();
  start(app);
};

startApp();
