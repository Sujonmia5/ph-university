import { config } from '../../config';
import { TStudent } from '../student/interface.student';
import { MUser } from './model.user';
import { TUser } from './interface.user';
import { MStudent } from '../student/model.student';
import { MAcademicSemester } from '../academicSemester/model.academicSemester';
import { generatedId } from './utils.user';
import { MAcademicDepartment } from '../academicDepartment/model.academicDepartment';
import AppError from '../../Error/appError';
import httpStatus from 'http-status';
import mongoose, { mongo } from 'mongoose';

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

    // transaction-1
    const newUser = await MUser.create([userData], { session });

    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;

    // transaction-2
    const result = await MStudent.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();
    return result;
    //
  } catch (error) {
    session.abortTransaction();
    session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }
};

export const userService = {
  createStudentIntoDB,
};
