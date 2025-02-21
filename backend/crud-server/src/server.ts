import http from "http";
import { Application, json, urlencoded } from "express";
import cors from "cors";

import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";

import { appRoutes } from "@crud/routes";
import { logger } from "@crud/logger/logger";

const SERVER_PORT = 4002;

export function start(app: Application) {
  securityMiddleware(app);
  standardMiddleware(app);
  routesMidleware(app);
  startServer(app);
}

function securityMiddleware(app: Application) {
  // Make sure cookie can be properly configured when requests go through a proxy.
  app.set("trust proxy", 1);

  // Protect against HTTP Parameter Pollution attacks.
  app.use(hpp());

  // Adds a set of HTTP headers to protect your app from common web vulnerabilities
  app.use(helmet());

  // Configures Cross-Origin Resource Sharing (CORS),
  // allowing only incoming requests from API Gateway.
  app.use(
    cors({
      origin: "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  );
}

function standardMiddleware(app: Application) {
  // Compresses HTTP responses to reduce payload size.
  app.use(compression());

  // Parses incoming JSON request bodies.
  app.use(json({ limit: "200mb" }));

  // Parses application/x-www-form-urlencoded data (form submissions).
  app.use(urlencoded({ limit: "200mb", extended: true }));
}

function routesMidleware(app: Application) {
  appRoutes(app);
}

function startServer(app: Application) {
  try {
    const httpServer: http.Server = new http.Server(app);
    logger.info(`API server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      logger.info(`API server running on port ${SERVER_PORT}`);
    });
  } catch (err) {
    logger.info(`API startServer error:`, err);
  }
}
