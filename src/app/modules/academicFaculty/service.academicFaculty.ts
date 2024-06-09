import { TAcademicFaculty } from './interface.academicFaculty';
import { MAcademicFaculty } from './model.academicFaculty';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await MAcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyIntoDB = async () => {
  const result = await MAcademicFaculty.find();
  return result;
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
