import express, { Request, Response } from "express";
import { CommonRouteConfig } from "../utilies/CommonRouteConfig";
import { AnimalController } from "../controller/AnimalController";
export class AnimalRoute extends CommonRouteConfig {
  constructor(app: express.Application) {
    super(app, "/animals", "AnimalRoute");
    this.configureRoutes();
  }

  configureRoutes(): express.Application {
    const animalController = new AnimalController();
    /**
     * Get all animals
     * @param req
     * @param res
     * @returns
     * 200 - An array of animals
     * 500 - Internal server error
     *
     */
    this.app.get(`${this.path}`, (req: Request, res: Response) => {
      animalController.getAllAnimals(req, res);
    });
    /**
     * Create a new animal
     * @param req
     * @param res
     * @returns
     * 201 - Animal created successfully
     * 400 - Validation error
     * 409 - Animal already exists
     * 500 - Internal server error
     *
     */
    this.app.post(`${this.path}`, (req: Request, res: Response) => {
      animalController.createAnimal(req, res);
    });
    /**
     * Get a single animal by ID
     * @param req
     * @param res
     * @returns
     * 200 - Animal retrieved successfully
     * 404 - Animal not found
     * 500 - Internal server error
     *
     */
    this.app.get(`${this.path}/:id`, (req: Request, res: Response) => {
      animalController.getAnimalById(req, res);
    });
    /**
     * Update an existing animal
     * @param req
     * @param res
     * @returns
     * 200 - Animal updated successfully
     * 400 - Validation error
     * 404 - Animal not found
     * 500 - Internal server error
     *
     */
    this.app.put(`${this.path}/:id`, (req: Request, res: Response) => {
      animalController.updateAnimal(req, res);
    });
    /**
     * Delete an existing animal
     * @param req
     * @param res
     * @returns
     * 204 - Animal deleted successfully
     * 404 - Animal not found
     * 500 - Internal server error
     *
     */
    this.app.delete(`${this.path}/:id`, (req: Request, res: Response) => {
      animalController.deleteAnimal(req, res);
    });
    return this.app;
  }
}
