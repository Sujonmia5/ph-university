import express from 'express';
import validateRequestData from '../../middleware/validationRequest';
import { authController } from './controller.auth';
import {
  zodChangePasswordValidationData,
  zodForgetPasswordValidation,
  zodLoginValidationData,
  zodRefreshTokenValidation,
  zodResetPasswordValidation,
} from './validation.auth';
import auth from '../../middleware/auth';
import { User_Role } from '../user/constants.user';
const route = express.Router();

route.post(
  '/login',
  validateRequestData(zodLoginValidationData),
  authController.loginController,
);
route.post(
  '/change-password',
  auth(User_Role.admin, User_Role.faculty, User_Role.student),
  validateRequestData(zodChangePasswordValidationData),
  authController.changePassword,
);
route.post(
  '/refresh-token',
  validateRequestData(zodRefreshTokenValidation),
  authController.getAccessToken,
);

route.post(
  '/forget-password',
  validateRequestData(zodForgetPasswordValidation),
  authController.forgetPassword,
);
route.post(
  '/reset-password',
  validateRequestData(zodResetPasswordValidation),
  authController.resetPassword,
);

export const authRoutes = route;
