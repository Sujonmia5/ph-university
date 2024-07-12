import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { semesterRegistrationService } from './service.semesterRegistration';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const data = req.body;
  const result =
    await semesterRegistrationService.createSemesterRegistrationIntoDB(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration completed',
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const query = req.query;
  const result =
    await semesterRegistrationService.getAllSemesterRegistrationFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration completed',
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const id = req.params.id as string;

  const result =
    await semesterRegistrationService.getSingleSemesterRegistrationFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration completed',
    data: result,
  });
});
const updatedSemesterRegistration = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result =
    await semesterRegistrationService.updatedSemesterRegistrationIntoDB(
      id,
      data,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration completed',
    data: result,
  });
});
export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updatedSemesterRegistration,
};
