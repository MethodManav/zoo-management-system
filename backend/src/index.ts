import express from "express";
import cors from "cors";
import expressWinston from "express-winston";
import { logger, LoggerConfiguration } from "./utilies/Logger";
import setUpRoutes from "./routes/IndexRoutes";
import { CommonRouteConfig } from "./utilies/CommonRouteConfig";

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.start(3000);
  }

  public start(port: number) {
    this.app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
      const routes = setUpRoutes(this.app);
      routes.forEach((route: CommonRouteConfig) => {
        logger.info(`Routes configured for ${route.getName()}`);
      });
    });
  }

  public configureMiddleware() {
    // Middleware configuration
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(expressWinston.logger(LoggerConfiguration));
  }
}

const ServerStart = new Server();
