import mongoose from 'mongoose';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/interfaceError';

const handleMongooseError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const sources: TErrorSources = Object.values(err.errors).map((value) => {
    return {
      path: value.path,
      message: value.message,
    };
  });
  return {
    statusCode: 400,
    message: 'validation Error',
    sources,
  };
};

export default handleMongooseError;
