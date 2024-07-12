import { NextFunction, Request, Response } from 'express';
import catchAsync from '../modules/utils/catchAsync';
import AppError from '../Error/appError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';
import { MUser } from '../modules/user/model.user';
import { TUserRole } from '../modules/user/interface.user';

const auth = (...requestRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'you are not authorized user',
      );
    }

    const decode = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, id, iat } = decode;
    const user = await MUser.isUserExistByCustomId(id);

    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, 'User not founded');
    }

    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted');
    }

    if (user.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'User is already blocked');
    }

    if (
      user.passwordChangeAt &&
      MUser.isJWTTokenTimeChecker(iat as number, user.passwordChangeAt)
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'you are not authorized user!',
      );
    }
    // console.log(requestRole, role);
    if (requestRole && !requestRole.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'you are not authorized user! hey',
      );
    }

    req.user = decode as JwtPayload;
    next();
  });
};

export default auth;
