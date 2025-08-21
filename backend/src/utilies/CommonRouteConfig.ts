import express from "express";
export abstract class CommonRouteConfig {
  app: express.Application;
  path: string;
  name: string;

  constructor(app: express.Application, path: string, name: string) {
    this.app = app;
    this.path = path;
    this.name = name;
  }
  abstract configureRoutes(): express.Application;
  getName(): string {
    return this.name;
  }
}
