import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { academicFacultyService } from './service.academicFaculty';
import AppError from '../../Error/appError';

const createAcademicFacultyController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await academicFacultyService.createAcademicFacultyIntoDB(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const getAllAcademicFacultyController = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getAllAcademicFacultyIntoDB();
  if (!result.length) {
    throw new AppError(404, 'Data not founded');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetch successfully',
    data: result,
  });
});

const getSingleAcademicFacultyController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await academicFacultyService.getSingleAcademicFacultyIntoDB(id);
  if (!result) {
    throw new AppError(404, 'Data not founded');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetch successfully',
    data: result,
  });
});

const updateAcademicFacultyController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await academicFacultyService.updateAcademicFacultyIntoDB(
    id,
    data,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty updated successfully',
    data: result,
  });
});

export const academicFacultyController = {
  createAcademicFacultyController,
  getAllAcademicFacultyController,
  getSingleAcademicFacultyController,
  updateAcademicFacultyController,
};
