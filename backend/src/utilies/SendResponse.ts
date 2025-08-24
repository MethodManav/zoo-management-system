import { Response } from "express";

interface SendResponseOptions<T> {
  res: Response;
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: T;
}

export function sendResponse<T>({
  res,
  statusCode = 200,
  success = true,
  message = "",
  data,
}: SendResponseOptions<T>): void {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
}
