import mongoose from 'mongoose';
import { TErrorSources } from '../interface/interface';

const validationErrorHandler = (err: mongoose.Error.ValidationError) => {
  const statusCode = 400;
  let message = '';

  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      message = val.message;
      return {
        path: val.path,
        message: val.message,
      };
    },
  );

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default validationErrorHandler;
