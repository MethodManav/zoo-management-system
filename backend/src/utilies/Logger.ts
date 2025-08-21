import winston from "winston";

export const logger = winston.createLogger({
  level: "info", // default logging level
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }), // include stack traces
    winston.format.splat(),
    winston.format.json() // structured JSON logs
  ),
  transports: [
    // Console logging
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

// Helper stream for morgan/express-winston
export const LoggerConfiguration = {
  winstonInstance: logger,
};
