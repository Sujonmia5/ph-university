import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { facultyService } from './service.faculty';

const getAllFacultyController = catchAsync(async (req, res) => {
  const query = req.query;

  // console.log(req.cookies);
  const result = await facultyService.getAllFacultyIntoDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetch successfully',
    data: result,
  });
});

const getSingleFacultyController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await facultyService.getSingleFacultyIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetch successfully',
    data: result,
  });
});
const updateSingleFacultyController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await facultyService.updateSingleFacultyIntoDB(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetch successfully',
    data: result,
  });
});
const deleteSingleFacultyController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await facultyService.deleteSingleFacultyIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetch successfully',
    data: result,
  });
});

export const facultyController = {
  getAllFacultyController,
  getSingleFacultyController,
  updateSingleFacultyController,
  deleteSingleFacultyController,
};
