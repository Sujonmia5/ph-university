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

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';

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

    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;

    //transaction-2
    const result = await MStudent.create([payload], { session });
    if (!result.length) {
      throw new AppError(400, 'Failed to created user');
    }
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to created student');
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
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

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userDoc.id = `F-${await generatedFacultyId(userDoc.role)}`;

    const newUser = await MUser.create([userDoc], { session });

    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;

    const result = await MFaculty.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to created Faculty');
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const userDoc: Partial<TUser> = {};
  userDoc.role = 'admin';
  userDoc.password = password || config.default_password;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userDoc.id = `A-${await generatedFacultyId(userDoc.role)}`;
    const newUser = await MUser.create([userDoc], { session });

    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;

    const result = await MAdmin.create([payload], { session });
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();

    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to admin created');
  } finally {
    await session.endSession();
  }
};

export const userService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
