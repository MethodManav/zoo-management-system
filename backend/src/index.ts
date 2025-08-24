import express from "express";
import cors from "cors";
import expressWinston from "express-winston";
import { logger, LoggerConfiguration } from "./utilies/Logger";
import setUpRoutes from "./routes/IndexRoutes";
import { CommonRouteConfig } from "./utilies/CommonRouteConfig";
import { DatabaseConfig } from "./model/DbConfig";

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.start(5000);
  }

  public start(port: number) {
    this.app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  }

  public configureRoutes() {
    const routes = setUpRoutes(this.app);
    routes.forEach((route: CommonRouteConfig) => {
      logger.info(`Routes configured for ${route.getName()}`);
    });
  }

  public configureMiddleware() {
    // Middleware configuration
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    this.app.use(
      expressWinston.logger({
        winstonInstance: logger,
        meta: false,
        msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
        expressFormat: false,
        colorize: true,
      })
    );
    const db = new DatabaseConfig();
    db.connect();
  }
}

new Server();
