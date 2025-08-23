import winston from "winston";
import expressWinston from "express-winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize()),
    }),
  ],
});

// Express middleware for logging requests/responses
export const LoggerConfiguration = expressWinston.logger({
  winstonInstance: logger,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  expressFormat: false,
  colorize: true,
  meta: false, // remove extra metadata
});
