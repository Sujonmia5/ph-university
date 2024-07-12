import httpStatus from 'http-status';
import AppError from '../../Error/appError';
import { MUser } from '../user/model.user';
import { TAuth } from './interface.auth';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config';
import bcrypt from 'bcrypt';
import {
  createToken,
  forgetPasswordSendMail,
  userInfoChecker,
} from './utils.auth';

const loginIntoDB = async (payload: TAuth) => {
  const user = await userInfoChecker(payload.id);

  const isPasswordMatch = await MUser.isPasswordMatch(
    payload.password,
    user.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'wrong password');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    refreshToken,
    accessToken,
    needPasswordChange: user.needPasswordChange,
  };
};

const changePasswordIntoDB = async (
  userInfo: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await userInfoChecker(userInfo.id);

  const isPasswordMatch = await MUser.isPasswordMatch(
    payload.oldPassword,
    user.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'old password did not match');
  }

  const hashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  await MUser.findOneAndUpdate(
    { id: user.id, role: userInfo.role },
    {
      password: hashPassword,
      needPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
  return null;
};

const newAccessToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized user');
  }

  const decode = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { id, iat } = decode;

  const user = await userInfoChecker(id);

  if (
    user.passwordChangeAt &&
    MUser.isJWTTokenTimeChecker(iat as number, user.passwordChangeAt)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized user!');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (id: string) => {
  const user = await userInfoChecker(id);

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );
  const resetLink = `http://localhost:3000/?id=${user.id}&token=${token}`;

  forgetPasswordSendMail(resetLink, user.email);
};

const resetPassword = async (
  payload: { id: string; password: string },
  token: string,
) => {
  const user = await userInfoChecker(payload.id);

  const decode = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  if (decode.id !== user.id) {
    throw new AppError(httpStatus.NOT_FOUND, 'token is invalid');
  }

  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_round),
  );
  const result = await MUser.findOneAndUpdate(
    {
      id: decode.id,
      role: decode.role,
    },
    {
      password: hashPassword,
      passwordChangeAt: new Date(),
    },
    {
      new: true,
    },
  );
  return result;
};
export const authService = {
  loginIntoDB,
  changePasswordIntoDB,
  newAccessToken,
  forgetPassword,
  resetPassword,
};
