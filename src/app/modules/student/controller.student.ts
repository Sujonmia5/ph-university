import { studentService } from './service.student';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import httpStatus from 'http-status';

const controllerStudentGetAll = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await studentService.getAllStudentIntoDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetch successfully',
    data: result,
  });
});

const controllerStudentGetSingle = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentService.getSingleStudentIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetch successfully',
    data: result,
  });
});

const controllerStudentUpdated = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = await studentService.updatedStudentIntoDB(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully.',
    data: result,
  });
});

const controllerStudentDeleted = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await studentService.deletedStudentIntoDB(id);

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
