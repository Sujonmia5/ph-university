/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from '../../config';
import { TStudent } from '../student/interface.student';
import { MUser } from './model.user';
import { TUser } from './interface.user';
import { MStudent } from '../student/model.student';
import { MAcademicSemester } from '../academicSemester/model.academicSemester';
import { generatedFacultyId, generatedId } from './utils.user';
import { MAcademicDepartment } from '../academicDepartment/model.academicDepartment';
import AppError from '../../Error/appError';
import mongoose from 'mongoose';
import { TFaculty } from '../faculty/interface.faculty';
import { MFaculty } from '../faculty/model.faculty';
import httpStatus from 'http-status';
import { TAdmin } from '../admin/interface.admin';
import { MAdmin } from '../admin/model.admin';
import { imageUploadToCloudinary } from '../utils/imageUpload';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  userData.email = payload.email;

  const admissionSemester = await MAcademicSemester.findById(
    payload.admissionSemester,
  );

  const academicDepartment = await MAcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!admissionSemester) {
    throw new AppError(404, 'Invalid academic semester id');
  }

  if (!academicDepartment) {
    throw new AppError(404, 'Invalid academic department id');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await generatedId(admissionSemester);

    //transaction-1
    const newUser = await MUser.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(400, 'Failed to created user');
    }

    if (file) {
      const imageName = `PH-${newUser[0].id}`;
      const path = file.path;
      const imageUploadResponse = await imageUploadToCloudinary(
        imageName,
        path,
      );
      payload.profileImage = (
        imageUploadResponse as { secure_url: string }
      ).secure_url;
    }

    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;
    payload.academicFaculty = academicDepartment.academicFaculty;

    //transaction-2
    const result = await MStudent.create([payload], { session });
    if (!result.length) {
      throw new AppError(400, 'Failed to created user');
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    if (error?.code === 11000) {
      throw new AppError(httpStatus.CONFLICT, error?.message);
    }
    throw new AppError(400, 'Failed to created student');
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  const userDoc: Partial<TUser> = {};

  const academicDepartment = await MAcademicDepartment.findOne({
    _id: payload.academicDepartment,
  });

  if (!academicDepartment) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Academic Department not founded',
    );
  }

  userDoc.password = password || (config.default_password as string);
  userDoc.role = 'faculty';
  userDoc.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userDoc.id = `F-${await generatedFacultyId(userDoc.role)}`;

    const newUser = await MUser.create([userDoc], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.FORBIDDEN, 'Failed to create user');
    }

    if (file) {
      const imageName = `ph-${newUser[0].id}`;
      const path = file.path;

      const imageUploadResponse = await imageUploadToCloudinary(
        imageName,
        path,
      );

      payload.profileImage = (
        imageUploadResponse as { secure_url: string }
      ).secure_url;
    }

    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;

    const result = await MFaculty.create([payload], { session });
    if (!result.length) {
      throw new AppError(httpStatus.FORBIDDEN, 'Failed to create Faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    if (error?.code === 11000) {
      throw new AppError(httpStatus.CONFLICT, error?.message);
    }
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to created faculty');
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  const userDoc: Partial<TUser> = {};
  userDoc.role = 'admin';
  userDoc.email = payload.email;
  userDoc.password = password || config.default_password;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userDoc.id = `A-${await generatedFacultyId(userDoc.role)}`;
    const newUser = await MUser.create([userDoc], { session });

    if (file) {
      const imageName = `ph-${newUser[0].id}`;
      const path = file.path;
      const imageUploadResponse = await imageUploadToCloudinary(
        imageName,
        path,
      );
      payload.profileImage = (
        imageUploadResponse as { secure_url: string }
      ).secure_url;
    }

    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;

    const result = await MAdmin.create([payload], { session });
    await session.commitTransaction();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    if (error?.code === 11000) {
      throw new AppError(httpStatus.CONFLICT, error?.message);
    }
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to admin created');
  }
};

const changeStatusIntoDB = async (id: string, payload: { status: string }) => {
  const result = await MUser.findOneAndUpdate({ id }, payload, { new: true });
  return result;
};

const getMe = async (id: string, role: string) => {
  let result;

  if (role === 'student') {
    result = await MStudent.findOne({ id });
  }

  if (role === 'faculty') {
    result = await MFaculty.findOne({ id });
  }

  if (role === 'admin') {
    result = await MAdmin.findOne({ id });
  }

  return result;
};

export const userService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatusIntoDB,
};
