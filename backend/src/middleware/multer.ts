import express, { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";

class UploadMiddleware {
  private static MAX_SIZE = 5 * 1024 * 1024; // 5 MB limit

  private storage = multer.memoryStorage();

  private fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only .jpg and .png files are allowed!"));
    }

    cb(null, true);
  };

  public upload = multer({
    storage: this.storage,
    fileFilter: this.fileFilter,
    limits: { fileSize: UploadMiddleware.MAX_SIZE },
  });
}

// Singleton instance
export const uploadMiddleware = new UploadMiddleware();
