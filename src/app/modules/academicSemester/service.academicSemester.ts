import AppError from '../../Error/appError';
import QueryBuilder from '../../builder/QueryBuilder';
import {
  SemesterNameAndCodeMapper,
  searchableFields,
} from './constant.academicSemester';
import { TAcademicSemester } from './interface.academicSemester';
import { MAcademicSemester } from './model.academicSemester';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (SemesterNameAndCodeMapper[payload.name] !== payload.code) {
    throw new AppError(404, 'Invalid semester code');
  }
  const result = await MAcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterIntoDB = async (query: Record<string, unknown>) => {
  const semesterQuery = new QueryBuilder(MAcademicSemester.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterQuery.queryModel;
  const meta = await semesterQuery.countTotal();
  return { meta, result };
};

const AcademicSemesterGetByIdIntoDB = async (id: string) => {
  const result = await MAcademicSemester.findById(id);
  return result;
};
const updateAcademicSemesterByIdIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    SemesterNameAndCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(404, 'Invalid semester code');
  }

  const result = await MAcademicSemester.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicSemesterServices = {
  getAllAcademicSemesterIntoDB,
  createAcademicSemesterIntoDB,
  AcademicSemesterGetByIdIntoDB,
  updateAcademicSemesterByIdIntoDB,
};
