import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log(err.message);
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  return res.status(500).json({
    errors: [
      {
        message: "Something went wrong",
      },
    ],
  });
};
