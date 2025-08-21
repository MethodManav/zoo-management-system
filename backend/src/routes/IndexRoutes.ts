import { AnimalRoute } from "./AnimalRoute";
import { CommonRouteConfig } from "../utilies/CommonRouteConfig";
import express from "express";

const setUpRoutes = (app: express.Application) => {
  const routes: Array<CommonRouteConfig> = [];
  routes.push(new AnimalRoute(app));
  return routes;
};

export default setUpRoutes;
