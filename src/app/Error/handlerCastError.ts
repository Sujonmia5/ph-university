import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/interface';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode: 400,
    message: err.message,
    errorSources,
  };
};

export default handleCastError;
