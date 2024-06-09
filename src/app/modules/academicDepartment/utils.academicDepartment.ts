import { MAcademicFaculty } from '../academicFaculty/model.academicFaculty';
import { Types } from 'mongoose';

export const academicFacultyCheck = async (id: Types.ObjectId) => {
  const academicFaculty = await MAcademicFaculty.findById(id);
  return academicFaculty;
};
