/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { TGenericErrorResponse } from '../interface/interfaceError';

const handleDuplicatedError = (err: any): TGenericErrorResponse => {
  const message = `${err.message.match(/"([^"]+)"/)[1]} is already exists`;
  const { key, value } = err.keyPattern;
  return {
    statusCode: 400,
    message,
    sources: [
      {
        path: key,
        message,
      },
    ],
  };
};

export default handleDuplicatedError;
