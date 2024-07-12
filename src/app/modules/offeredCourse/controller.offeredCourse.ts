import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { offeredCourseService } from './service.offeredCourse';

const createOfferedCourseController = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await offeredCourseService.createOfferedCourseIntoDB(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offer course created successfully',
    data: result,
  });
});
const getAllOfferedCourseController = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await offeredCourseService.getAllOfferedCourseFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offer course fetch successfully',
    data: result,
  });
});

const getSingleOfferedCourseController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await offeredCourseService.getSingleOfferedCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offer course fetch successfully',
    data: result,
  });
});

const updateOfferedCourseController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await offeredCourseService.updateOfferedCourseFromDB(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offer course created successfully',
    data: result,
  });
});

const deleteOfferedCourseController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await offeredCourseService.deleteOfferedCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offer course deleted successfully',
    data: result,
  });
});

export const offeredCourseController = {
  createOfferedCourseController,
  getAllOfferedCourseController,
  getSingleOfferedCourseController,
  updateOfferedCourseController,
  deleteOfferedCourseController,
};
