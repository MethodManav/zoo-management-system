import express from "express";
import { CommonRouteConfig } from "../utilies/CommonRouteConfig";
export class AnimalRoute extends CommonRouteConfig {
  constructor(app: express.Application) {
    super(app, "animals", "AnimalRoute");
  }

  configureRoutes(): express.Application {
    this.app.get(`${this.path}`, (req, res) => {
      res.send("List of animals");
    });
    return this.app;
  }
}
