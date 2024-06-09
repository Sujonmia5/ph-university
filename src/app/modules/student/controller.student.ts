import { Request, Response } from 'express';
import { studentService } from './service.student';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import httpStatus from 'http-status';

const controllerStudentGetAll = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudentIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetch successfully',
    data: result,
  });
});

const controllerStudentGetSingle = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await studentService.getSingleStudentIntoDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetch successfully',
    data: result,
  });
});

const controllerStudentUpdated = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const data = req.body;

  const result = await studentService.updatedStudentIntoDB(studentId, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully.',
    data: result,
  });
});

const controllerStudentDeleted = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await studentService.deletedStudentIntoDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully.',
    data: result,
  });
});

export const studentController = {
  controllerStudentGetAll,
  controllerStudentGetSingle,
  controllerStudentUpdated,
  controllerStudentDeleted,
};
