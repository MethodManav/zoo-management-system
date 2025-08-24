import express, { Request, Response } from "express";
import { logger } from "../utilies/Logger";
import { sendResponse } from "../utilies/SendResponse";
import { JWTMiddleware } from "./jwtMiddleware";
export class AuthMiddleware {
  static isValidToken(req: Request, res: Response, next: express.NextFunction) {
    const token = req.headers["authorization"];
    if (!token) {
      logger.warn("Unauthorized access attempt");
      return sendResponse({
        res,
        statusCode: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    try {
      const decoded = JWTMiddleware.verifyToken(token.split(" ")[1]);
      req.user = decoded as { id: string; email: string };
    } catch (error) {
      logger.warn("Unauthorized access attempt with invalid token");
      return sendResponse({
        res,
        statusCode: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    next();
  }
}
