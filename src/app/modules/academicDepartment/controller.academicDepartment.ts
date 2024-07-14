import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { academicDepartmentService } from './service.academicDepartment';

const createAcademicDepartmentController = catchAsync(async (req, res) => {
  const data = req.body;
  const result =
    await academicDepartmentService.createAcademicDepartmentIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created is successfully',
    data: result,
  });
});

const getAllAcademicDepartmentController = catchAsync(async (req, res) => {
  const query = req.query;
  const result =
    await academicDepartmentService.getAllAcademicDepartmentIntoDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments fetch successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAcademicDepartmentController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await academicDepartmentService.getSingleAcademicDepartmentIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments fetch successfully',
    data: result,
  });
});

const updateAcademicDepartmentController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result =
    await academicDepartmentService.updatedAcademicDepartmentIntoDB(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartmentController,
  getAllAcademicDepartmentController,
  getSingleAcademicDepartmentController,
  updateAcademicDepartmentController,
};
