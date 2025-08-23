import { AnimalRoute } from "./AnimalRoute";
import { CommonRouteConfig } from "../utilies/CommonRouteConfig";
import express from "express";
import { VisitorRoutes } from "./VisitorRoutes";

const setUpRoutes = (app: express.Application) => {
  const routes: Array<CommonRouteConfig> = [];
  routes.push(new AnimalRoute(app));
  routes.push(new VisitorRoutes(app));
  return routes;
};

export default setUpRoutes;
