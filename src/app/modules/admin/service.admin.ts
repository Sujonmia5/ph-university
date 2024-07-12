import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFields } from '../student/constant.student';
import { TAdmin } from './interface.admin';
import { MAdmin } from './model.admin';
import { MUser } from '../user/model.user';
import AppError from '../../Error/appError';
import httpStatus from 'http-status';

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(MAdmin.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.queryModel;
  const meta = await adminQuery.countTotal();
  return { meta, result };
};

const getSingleAdminFromDB = async (id: string): Promise<TAdmin | null> => {
  const result = await MAdmin.findById(id);
  return result;
};
const updateAdminIntoDB = async (
  id: string,
  payload: Partial<TAdmin>,
): Promise<TAdmin | null> => {
  const { name, ...remainingData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  const result = await MAdmin.findByIdAndUpdate(id, modifiedData, {
    new: true,
  });
  return result;
};

const deleteSingleAdminIntoDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await MAdmin.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      { session },
    );

    const result = await MUser.findByIdAndUpdate(
      deletedAdmin?.userId,
      {
        isDeleted: true,
      },
      { new: true, session },
    );
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted Admin');
  } finally {
    await session.endSession();
  }
};

export const adminService = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteSingleAdminIntoDB,
};
