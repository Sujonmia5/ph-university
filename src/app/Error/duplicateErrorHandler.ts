import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/interface';

const duplicateErrorHandler = (err: any): TGenericErrorResponse => {
  const message = err.message.match(/"([^"]+)"/)[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: message,
    },
  ];
  return {
    statusCode: 400,
    message: 'duplicated error',
    errorSources,
  };
};

export default duplicateErrorHandler;
