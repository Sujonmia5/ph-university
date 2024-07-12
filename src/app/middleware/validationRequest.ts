import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../modules/utils/catchAsync';

const validateRequestData = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const cookie = req.cookies;
    await schema.parseAsync({ ...body, ...cookie });
    next();
  });
};

export default validateRequestData;
