import { NextFunction, Request, Response } from 'express';
import { CustomErrorHandler, ErrorMessages } from '../errors/custom.error';

export const errorHandler = (
  err: CustomErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const errors = err.errors;
  const response: {
    [x: string]: string;
  } & { errors?: ErrorMessages } = { [err.name]: err.message };

  if (errors) {
    response.errors = errors;
  }

  res.status(statusCode).json(response);
};
