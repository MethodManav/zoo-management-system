import { Request, Response } from "express";
import AnimalModel, {
  AnimalValidation,
  UpdateAnimalValidation,
} from "../model/AnimalModel";
import { sendResponse } from "../utilies/SendResponse";
import { logger } from "../utilies/Logger";
import { S3Config } from "../utilies/S3Config";
import { EnvParser } from "../utilies/Config";
export class AnimalController {
  async createAnimal(req: Request, res: Response): Promise<void> {
    const { body } = req;
    try {
      const isValid = AnimalValidation.safeParse(body);
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
      const isExist = await AnimalModel.findOne({ name: body.name });
      if (isExist) {
        logger.error("Animal already exists", { name: body.name });
        return sendResponse({
          res,
          statusCode: 409,
          success: false,
          message: "Animal already exists",
          data: { name: body.name },
        });
      }
      const newAnimal = await AnimalModel.create(body);
      return sendResponse({
        res,
        statusCode: 201,
        success: true,
        message: "Animal created successfully",
        data: { animal: newAnimal },
      });
    } catch (error) {
      logger.error("Error creating animal -> (createAnimal)", error);
      sendResponse({
        res,
        statusCode: 500,
        success: false,
        message: "Error creating animal",
        data: {},
      });
    }
  }

  async getAllAnimals(req: Request, res: Response): Promise<void> {
    try {
      const animals = await AnimalModel.find();
      return sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "Animals retrieved successfully",
        data: { animals },
      });
    } catch (error) {
      logger.error("Error retrieving animals -> (getAllAnimals)", error);
      sendResponse({
        res,
        statusCode: 500,
        success: false,
        message: "Error retrieving animals",
        data: {},
      });
    }
  }

  async getAnimalById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const animal = await AnimalModel.findById(id);
      if (!animal) {
        logger.error("Animal not found", { id });
        return sendResponse({
          res,
          statusCode: 404,
          success: false,
          message: "Animal not found",
          data: {},
        });
      }
      return sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "Animal retrieved successfully",
        data: { animal },
      });
    } catch (error) {
      logger.error("Error retrieving animal -> (getAnimalById)", error);
      sendResponse({
        res,
        statusCode: 500,
        success: false,
        message: "Error retrieving animal",
        data: {},
      });
    }
  }

  async updateAnimal(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { body } = req;
    try {
      const isValid = UpdateAnimalValidation.safeParse(body);
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
      const animal = await AnimalModel.findByIdAndUpdate(id, body, {
        new: true,
      });
      if (!animal) {
        logger.error("Animal not found", { id });
        return sendResponse({
          res,
          statusCode: 404,
          success: false,
          message: "Animal not found",
          data: {},
        });
      }
      return sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "Animal updated successfully",
        data: { animal },
      });
    } catch (error) {
      logger.error("Error updating animal -> (updateAnimal)", error);
      sendResponse({
        res,
        statusCode: 500,
        success: false,
        message: "Error updating animal",
        data: {},
      });
    }
  }

  async deleteAnimal(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const animal = await AnimalModel.findByIdAndDelete(id);
      if (!animal) {
        logger.error("Animal not found", { id });
        return sendResponse({
          res,
          statusCode: 404,
          success: false,
          message: "Animal not found",
          data: {},
        });
      }
      return sendResponse({
        res,
        statusCode: 204,
        success: true,
        message: "Animal deleted successfully",
        data: {},
      });
    } catch (error) {
      logger.error("Error deleting animal -> (deleteAnimal)", error);
      sendResponse({
        res,
        statusCode: 500,
        success: false,
        message: "Error deleting animal",
        data: {},
      });
    }
  }

  async uploadAnimalImage(req: Request, res: Response): Promise<string> {
    const { file } = req;
    const s3Client = new S3Config(
      EnvParser.s3.accessKeyId,
      EnvParser.s3.secretAccessKey,
      EnvParser.s3.region,
      EnvParser.s3.bucketName
    );
    if (!file) {
      logger.error("No file uploaded");
      sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: "No file uploaded",
        data: {},
      });
      return "No file uploaded";
    }
    const s3Instance = s3Client.getS3Instance();
    const uploadParams = {
      Bucket: EnvParser.s3.bucketName,
      Key: `${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const uploadResult = await s3Instance.upload(uploadParams).promise();
    if (!uploadResult) {
      logger.error("Error uploading file to S3");
      sendResponse({
        res,
        statusCode: 500,
        success: false,
        message: "Error uploading file to S3",
        data: {},
      });
      return "Error uploading file to S3";
    }

    logger.info("File uploaded successfully");
    const key = uploadResult.Key;
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: "File uploaded successfully",
      data: { key },
    });
    return "File uploaded successfully";
  }
}
