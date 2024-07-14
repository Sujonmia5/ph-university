import httpStatus from 'http-status';
import AppError from '../../Error/appError';
import { MAcademicSemester } from '../academicSemester/model.academicSemester';
import { TSemesterRegistration } from './interface.semesterRegistration';
import { MSemesterRegistration } from './model.semesterRegistration';
import QueryBuilder from '../../builder/QueryBuilder';
import { semesterRegistrationStatusObj } from './constants.semesterRegistration';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const isThereAnyUpcomingOrOngoingSemester =
    await MSemesterRegistration.findOne({
      $or: [
        {
          status: 'UPCOMING',
        },
        {
          status: 'ONGOING',
        },
      ],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} Semester`,
    );
  }

  const academicSemester = payload?.academicSemester;

  const isAcademicSemesterExist =
    await MAcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester is not found');
  }

  const isSemesterRegistrationExist = await MSemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExist) {
    throw new AppError(httpStatus.CONFLICT, 'Semester already registration');
  }

  const result = await MSemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    MSemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.queryModel;
  const meta = await semesterRegistrationQuery.countTotal();
  return { meta, result };
};
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await MSemesterRegistration.findById(id);
  return result;
};

const updatedSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExist = await MSemesterRegistration.findById(id);

  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Registration Semester is not founded',
    );
  }

  if (
    isSemesterRegistrationExist.status === semesterRegistrationStatusObj.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change ENDED semester registration status}`,
    );
  }

  if (
    isSemesterRegistrationExist.status ===
      semesterRegistrationStatusObj.UPCOMING &&
    payload.status === semesterRegistrationStatusObj.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change From ${isSemesterRegistrationExist.status} to ${payload.status}`,
    );
  }
  if (
    isSemesterRegistrationExist?.status ===
      semesterRegistrationStatusObj?.ONGOING &&
    payload?.status === semesterRegistrationStatusObj?.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change From ${isSemesterRegistrationExist.status} to ${payload.status}`,
    );
  }

  const result = await MSemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updatedSemesterRegistrationIntoDB,
};
