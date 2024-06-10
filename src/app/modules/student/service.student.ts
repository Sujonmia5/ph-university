import httpStatus from 'http-status';
import AppError from '../../Error/appError';
import { MUser } from '../user/model.user';
import { TStudent } from './interface.student';
import { MStudent } from './model.student';
import mongoose from 'mongoose';

const getAllStudentIntoDB = async () => {
  const result = await MStudent.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentIntoDB = async (id: string) => {
  const result = await MStudent.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updatedStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [keys, value] of Object.entries(name)) {
      modifiedData[`name.${keys}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await MStudent.findOneAndUpdate({ id }, modifiedData, {
    new: true,
  });
  return result;
};

// deleted student services
const deletedStudentIntoDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await MUser.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    const deleteStudent = await MStudent.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted student');
  }
};

export const studentService = {
  getAllStudentIntoDB,
  getSingleStudentIntoDB,
  updatedStudentIntoDB,
  deletedStudentIntoDB,
};
