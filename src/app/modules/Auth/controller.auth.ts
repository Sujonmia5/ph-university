/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { authService } from './service.auth';
import { config } from '../../config';

const loginController = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await authService.loginIntoDB(data);
  const { accessToken, refreshToken, needPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_DEV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successfully!',
    data: { accessToken, needPasswordChange },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePasswordIntoDB(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password updated successfully!',
    data: result,
  });
});

const getAccessToken = catchAsync(async (req, res) => {
  const result = await authService.newAccessToken(req.cookies.refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password updated successfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const { id } = req.body;
  await authService.forgetPassword(id);

  res.status(200).json({
    success: true,
    message: 'Check your email and change password',
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string;
  const data = req.body;
  const result = await authService.resetPassword(data, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password reset successfully!',
    data: result,
  });
});
export const authController = {
  loginController,
  changePassword,
  getAccessToken,
  forgetPassword,
  resetPassword,
};
