import winston from "winston";

// Winston uses 'format' to transform log messages.
const { combine, timestamp, printf, colorize } = winston.format;

// A custom printf format: define how messages look
const customFormat = printf(({ level, message, timestamp }) => {
  // Example output: [2025-01-15 10:00:00 PM] info: Hello world
  return `[${timestamp}] ${level}: ${message}`;
});

// Create the logger
const logger = winston.createLogger({
  // default level for logs; logs below this level are not output
  level: "info",
  format: combine(
    // add a timestamp field
    timestamp({
      // By default, format uses UTC. Optionally do: format: 'YYYY-MM-DD HH:mm:ss'
    }),
    // colorize the level (info, warn, error)
    colorize(),
    // use our custom printf format
    customFormat
  ),
  transports: [
    // 1) Print everything to the console
    new winston.transports.Console(),
  ],
});

export { logger };
