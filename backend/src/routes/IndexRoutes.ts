import { AnimalRoute } from "./AnimalRoute";
import { CommonRouteConfig } from "../utilies/CommonRouteConfig";
import express from "express";
import { VisitorRoutes } from "./VisitorRoutes";
import { AdminRoute } from "./AdminRoute";

const setUpRoutes = (app: express.Application) => {
  const routes: Array<CommonRouteConfig> = [];
  routes.push(new AnimalRoute(app));
  routes.push(new VisitorRoutes(app));
  routes.push(new AdminRoute(app));
  return routes;
};

export default setUpRoutes;
