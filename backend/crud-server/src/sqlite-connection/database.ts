import { Sequelize } from "sequelize";

import { config } from "@crud/config";
import { logger } from "@crud/logger/logger";

// Either get the SQLITE_DB_PATH from the env file or set the default to database.sqlite
const DB_PATH = config.SQLITE_DB_PATH || "database.sqlite";

/**
 * Initialize Sequelize with SQLite dialect.
 * where the SQLite file will be created/stored at DB_PATH.
 */
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DB_PATH,
  logging: false,
});

const databaseConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });
    logger.info("API Service successfully connected to database.");
  } catch (error) {
    logger.error("API Service databaseConnection() method error", error);
  }
};

export { databaseConnection };
