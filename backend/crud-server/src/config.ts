import dotenv from "dotenv";

dotenv.config({});

class Config {
  public SQLITE_DB_PATH: string | undefined;

  constructor() {
    this.SQLITE_DB_PATH = process.env.SQLITE_DB_PATH || "";
  }
}

export const config: Config = new Config();
