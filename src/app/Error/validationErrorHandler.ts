import { ZodError } from 'zod';
import { TErrorSources } from '../interface/interface';

const handleValidationError = (err: ZodError) => {
  const errorSources: TErrorSources = err.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
