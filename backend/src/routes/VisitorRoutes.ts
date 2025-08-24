import { VisitorController } from "../controller/VisitorController";
import { CommonRouteConfig } from "../utilies/CommonRouteConfig";
import express from "express";

export class VisitorRoutes extends CommonRouteConfig {
  constructor(_app: express.Application) {
    super(_app, "/visitor", "VisitorRoutes");
    this.configureRoutes();
  }
  configureRoutes(): express.Application {
    const visitorController = new VisitorController();
    this.app.get(`${this.path}`, (req, res) => {
      res.send(`Welcome to the ${this.name} route`);
    });
    /**
     * Create a new visitor ticket
     * @param req
     * @param res
     * @returns
     * 201 - Ticket created successfully
     * 400 - Validation error
     * 409 - Ticket already exists
     * 500 - Internal server error
     *
     */
    this.app.post(`${this.path}`, (req, res) => {
      visitorController.createVisitorTicket(req, res);
    });
    

    return this.app;
  }
}
