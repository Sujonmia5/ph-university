import { z } from 'zod';

export const zodLoginValidationData = z.object({
  id: z.string({ required_error: 'id is required!' }),
  password: z.string({ required_error: 'password is required' }),
});

export const zodChangePasswordValidationData = z.object({
  oldPassword: z.string({ required_error: 'old password is required' }),
  newPassword: z.string({ required_error: 'new password is required' }),
});

export const zodRefreshTokenValidation = z.object({
  refreshToken: z.string({
    required_error: 'refresh token is required',
  }),
});

export const zodForgetPasswordValidation = z.object({
  id: z.string({
    required_error: 'Id is required',
  }),
});
export const zodResetPasswordValidation = z.object({
  id: z.string({
    required_error: 'Id is required',
  }),
  password: z.string({
    required_error: 'password is required',
  }),
});
