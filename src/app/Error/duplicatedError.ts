/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { TGenericErrorResponse } from '../interface/interfaceError';

const handleDuplicatedError = (err: any): TGenericErrorResponse => {
  const message = `${err.message.match(/"([^"]+)"/)[1]} is already exists`;
  return {
    statusCode: 400,
    message,
    sources: [
      {
        path: '',
        message,
      },
    ],
  };
};

export default handleDuplicatedError;
