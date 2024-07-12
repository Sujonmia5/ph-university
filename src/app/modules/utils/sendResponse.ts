import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  token?: string;
};
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    token: data.token,
    data: data?.data,
  });
};

export default sendResponse;
