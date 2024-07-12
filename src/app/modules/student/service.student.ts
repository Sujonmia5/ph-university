/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
import httpStatus from 'http-status';
import AppError from '../../Error/appError';
import { TStudent } from './interface.student';
import { MStudent } from './model.student';
import mongoose from 'mongoose';
import { searchableFields } from './constant.student';
import QueryBuilder from '../../builder/QueryBuilder';
import { MUser } from '../user/model.user';

const getAllStudentIntoDB = async (query: Record<string, unknown>) => {
  // let searchTerm = '';
  // if (query.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }

  // const searchableFields = [
  //   'email',
  //   'name.firstName',
  //   'name.lastName',
  //   'name.middleName',
  //   'presentAddress',
  // ];

  // const excludesFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludesFields.forEach((field) => delete queryObj[field]);

  // const searchQuery = MStudent.find({
  //   $or: searchableFields.map((field: string) => {
  //     return {
  //       [field]: { $regex: searchTerm, $options: 'i' },
  //     };
  //   }),
  // });
  // const filterQuery = searchQuery.find(queryObj);

  // let sort = '-createdAt';

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let limit = 1;
  // let page = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const skipQuery = sortQuery.skip(skip);
  // const limitQuery = skipQuery.limit(limit);

  // let fields = '-__v';
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // const result = await limitQuery
  //   .select(fields)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  const studentQuery = new QueryBuilder(
    MStudent.find()
      .populate('userId')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.queryModel;
  const meta = await studentQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getSingleStudentIntoDB = async (id: string) => {
  const result = await MStudent.findById(id)
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

  const result = await MStudent.findByIdAndUpdate(id, modifiedData, {
    new: true,
  });
  return result;
};

// deleted student services
const deletedStudentIntoDB = async (id: string) => {
  //
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deleteStudent = await MStudent.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    await MUser.findByIdAndUpdate(
      deleteStudent?.userId,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    await session.commitTransaction();

    return deleteStudent;
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${error?.message}` || 'Failed to deleted student',
    );
  } finally {
    await session.endSession();
  }
};

export const studentService = {
  getAllStudentIntoDB,
  getSingleStudentIntoDB,
  updatedStudentIntoDB,
  deletedStudentIntoDB,
};
