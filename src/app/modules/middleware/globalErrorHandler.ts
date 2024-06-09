import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const defaultMessage = 'something want wrong';
  // console.log({ err });
  return res.status(statusCode).json({
    success: false,
    message: err.message || err.stack || err.Error || defaultMessage,
    error: err,
  });
};

export default globalErrorHandler;
