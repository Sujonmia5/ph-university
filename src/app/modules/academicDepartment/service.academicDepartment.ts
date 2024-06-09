import httpStatus from 'http-status';
import AppError from '../../Error/appError';
import { TAcademicDepartment } from './interface.academicDepartment';
import { MAcademicDepartment } from './model.academicDepartment';
import { academicFacultyCheck } from './utils.academicDepartment';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const academic_faculty = await academicFacultyCheck(payload.academicFaculty);

  if (!academic_faculty) {
    throw new AppError(404, 'Academic Faculty id is not valid');
  }

  const result = await MAcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentIntoDB = async () => {
  const result = await MAcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentIntoDB = async (id: string) => {
  const result =
    await MAcademicDepartment.findById(id).populate('academicFaculty');
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Departments is not found');
  }
  return result;
};

const updatedAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await MAcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const academicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentIntoDB,
  getSingleAcademicDepartmentIntoDB,
  updatedAcademicDepartmentIntoDB,
};
