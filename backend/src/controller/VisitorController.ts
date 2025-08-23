import { Request, Response } from "express";
import VisitorModel, { VisitorSchema } from "../model/VisitorModel";
import { sendResponse } from "../utilies/SendResponse";
import { logger } from "../utilies/Logger";
export class VisitorController {
  async createVisitorTicket(req: Request, res: Response) {
    try {
      const { body } = req;
      const isValid = VisitorSchema.safeParse(body);
      if (!isValid.success) {
        logger.error("Validation error", isValid.error);
        return sendResponse({
          res,
          statusCode: 400,
          success: false,
          message: "Validation error",
          data: {},
        });
      }
      const visitor = await VisitorModel.create(body);
      return sendResponse({
        res,
        statusCode: 201,
        success: true,
        message: "Visitor created successfully",
        data: visitor,
      });
    } catch (error) {
      logger.error(
        "Error while creating visitor -> (createVisitorTicket)",
        error
      );
      return sendResponse({
        res,
        statusCode: 500,
        success: false,
        message: "Error creating visitor",
        data: {},
      });
    }
  }
}
