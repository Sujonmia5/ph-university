import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicFaculty } from './interface.academicFaculty';
import { MAcademicFaculty } from './model.academicFaculty';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await MAcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyIntoDB = async (query: Record<string, unknown>) => {
  const academicFacultyQuery = new QueryBuilder(MAcademicFaculty.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate();
  const meta = await academicFacultyQuery.countTotal();
  const result = await academicFacultyQuery.queryModel;
  return { meta, result };
};

const getSingleAcademicFacultyIntoDB = async (id: string) => {
  const result = await MAcademicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await MAcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const academicFacultyService = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyIntoDB,
  getSingleAcademicFacultyIntoDB,
  updateAcademicFacultyIntoDB,
};
