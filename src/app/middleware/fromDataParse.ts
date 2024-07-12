import { NextFunction, Request, Response } from 'express';

export const fromDataParse = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.body = JSON.parse(req.body.data);
  next();
};
