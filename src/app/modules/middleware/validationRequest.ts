import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequestData = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      await schema.parseAsync({ ...body });
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequestData;
