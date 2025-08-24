import Admin, { AdminValidation } from "../model/AdminModel";
import { logger } from "../utilies/Logger";
import { sendResponse } from "../utilies/SendResponse";
import bcrypt from "bcrypt";
import { JWTMiddleware } from "../middleware/jwtMiddleware";
import { Request, Response } from "express";

export class AdminController {
  public async getAdminData(req: Request, res: Response): Promise<void> {
    try {
      const adminData = await Admin.find({
        _id: req.user.id,
      });
      if (adminData.length > 0) {
        logger.info("Admin data retrieved successfully");
        return sendResponse({
          res,
          statusCode: 200,
          success: true,
          message: "Admin data retrieved successfully",
          data: adminData[0],
        });
      } else {
        logger.warn("Admin not found");
        return sendResponse({
          res,
          statusCode: 404,
          success: false,
          message: "Admin not found",
        });
      }
    } catch (error) {
      logger.error("Error retrieving admin data");
      return sendResponse({
        res,
        statusCode: 500,
        success: false,
        message: "Internal server error",
      });
    }
  }

  public async createAdmin(req: Request, res: Response): Promise<void> {
    const { body } = req;
    const isValidAdmin = AdminValidation.safeParse(body);
    if (!isValidAdmin.success) {
      logger.warn("Invalid admin data");
      return sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: "Invalid admin data",
        data: {},
      });
    }

    const newAdmin = new Admin(body);
    try {
      await newAdmin.save();
      logger.info("Admin created successfully");
      return sendResponse({
        res,
        statusCode: 201,
        success: true,
        message: "Admin created successfully",
        data: newAdmin,
      });
    } catch (error) {
      logger.error("Error creating admin");
      return sendResponse({
        res,
        statusCode: 500,
        success: false,
        message: "Internal server error",
      });
    }
  }

  public async loginAdmin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        logger.warn("Admin not found");
        return sendResponse({
          res,
          statusCode: 404,
          success: false,
          message: "Admin not found",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        logger.warn("Invalid password");
        return sendResponse({
          res,
          statusCode: 401,
          success: false,
          message: "Invalid password",
        });
      }
      // Generate JWT token
      const token = JWTMiddleware.signToken({
        id: admin._id,
        email: admin.email,
      });

      logger.info("Admin logged in successfully");
      return sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "Admin logged in successfully",
        data: token,
      });
    } catch (error) {
      logger.error("Error logging in admin");
      return sendResponse({
        res,
        statusCode: 500,
        success: false,
        message: "Internal server error",
      });
    }
  }
}
