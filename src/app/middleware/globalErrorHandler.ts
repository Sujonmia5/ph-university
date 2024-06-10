/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';

import { config } from '../config';
import { ZodError } from 'zod';
import handleZodError from '../Error/zodHandler';
import { TErrorSources } from '../interface/interfaceError';
import AppError from '../Error/appError';
import handleMongooseError from '../Error/validationHandler';
import handleDuplicatedError from '../Error/duplicatedError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something want wrong';
  let sources: TErrorSources = [
    {
      path: '',
      message: 'Something want wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    sources = simplifiedError.sources;
  } else if (err.name === 'ValidationError') {
    const simplifiedError = handleMongooseError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    sources = simplifiedError.sources;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicatedError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    sources = simplifiedError.sources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    sources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    sources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    sources,
    stack: config.NODE_DEV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

/*
Error response type 
{
success: false,
message:''
sources:[{
path:'',
message:''
}]
}
*/
