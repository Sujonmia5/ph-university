import { Types } from 'mongoose';

export type TAdminName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TBloodGroups =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TAdmin = {
  id: string; // generated
  userId: Types.ObjectId; // ObjectId
  designation: string;
  name: Record<string, unknown>; // object
  gender: string;
  bloodGroup: TBloodGroups;
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  isDeleted: boolean;
};
