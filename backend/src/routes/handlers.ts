import { Request, Response, NextFunction } from "express";
import { HttpException } from "models/exceptions.model";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(JSON.stringify(err));
  if (err && err instanceof HttpException) {
    res.status(err.errorCode).json(err.message);
  } else if (err) {
    res.status(500).json("Internal Server Error");
  }
};

export default errorHandler;
