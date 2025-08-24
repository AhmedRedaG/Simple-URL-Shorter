import { Request, Response } from "express";

import AppError from "../utils/appError.js";

const notFoundError = (req: Request, res: Response) => {
  res.jsend.fail({ message: "Not found" });
};

const unexpectedError = (
  err: { message: string; statusCode: number },
  req: Request,
  res: Response,
  next: any
) => {
  if (err instanceof AppError) {
    const { message, statusCode } = err;
    return res.jsend.fail({ message }, statusCode);
  }

  console.error(err);

  res.jsend.error("Internal server error");
};

const errorHandler = [notFoundError, unexpectedError];

export default errorHandler;
