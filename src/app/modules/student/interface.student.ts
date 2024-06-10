import { Types } from 'mongoose';

export type TStudentName = {
  firstName: string;
  middleName?: string;
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

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  contactNo: string;
  emergencyContactNo: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  emergencyContactNo: string;
};

export type TStudent = {
  id: string;
  userId: Types.ObjectId;
  name: TStudentName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  bloodGroup?: TBloodGroups;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};
