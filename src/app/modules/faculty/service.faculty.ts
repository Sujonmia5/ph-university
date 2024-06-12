import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFields } from '../student/constant.student';
import { MUser } from '../user/model.user';
import { TFaculty } from './interface.faculty';
import { MFaculty } from './model.faculty';
import AppError from '../../Error/appError';
import httpStatus from 'http-status';

const getAllFacultyIntoDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    MFaculty.find().populate('academicDepartment'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.queryModel;
  return result;
};

const getSingleFacultyIntoDB = async (id: string) => {
  const result = await MFaculty.findById(id).populate('academicDepartment');
  return result;
};

const updateSingleFacultyIntoDB = async (
  id: string,
  payload: Partial<TFaculty>,
) => {
  const { name, ...remainingData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  const result = await MFaculty.findByIdAndUpdate(id, modifiedData, {
    new: true,
  });
  return result;
};

const deleteSingleFacultyIntoDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await MFaculty.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      { session },
    );

    const result = await MUser.findByIdAndUpdate(
      deletedFaculty?.userId,
      {
        isDeleted: true,
      },
      { new: true, session },
    );
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted faculty');
  } finally {
    await session.endSession();
  }
};

export const facultyService = {
  getAllFacultyIntoDB,
  getSingleFacultyIntoDB,
  updateSingleFacultyIntoDB,
  deleteSingleFacultyIntoDB,
};
