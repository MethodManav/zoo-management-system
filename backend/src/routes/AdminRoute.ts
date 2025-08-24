import { AdminController } from "../controller/AdminController";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { CommonRouteConfig } from "../utilies/CommonRouteConfig";
import express, { Request, Response } from "express";

export class AdminRoute extends CommonRouteConfig {
  constructor(app: express.Application) {
    super(app, "/admin", "AdminRoute");
    this.configureRoutes();
  }

  configureRoutes(): express.Application {
    const adminController = new AdminController();
    this.app
      .route("/admin")
      .get(AuthMiddleware.isValidToken, (req: Request, res: Response) => {
        adminController.getAdminData(req, res);
      });
    this.app.route("/admin/create").post((req: Request, res: Response) => {
      adminController.createAdmin(req, res);
    });
    this.app.route("/admin/login").post((req: Request, res: Response) => {
      adminController.loginAdmin(req, res);
    });
    return this.app;
  }
}
