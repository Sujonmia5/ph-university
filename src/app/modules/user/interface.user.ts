import { Model } from 'mongoose';
import { User_Role } from './constants.user';

export interface TUser {
  id: string;
  email: string;
  password: string;
  needPasswordChange: boolean;
  passwordChangeAt?: Date;
  role: 'student' | 'faculty' | 'admin' | 'superAdmin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface TUserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser | null>;
  isPasswordMatch(planPassword: string, hashPassword: string): Promise<boolean>;
  isJWTTokenTimeChecker(tokenTime: number, passwordChangeTime: Date): boolean;
}

export type TUserRole = keyof typeof User_Role;
