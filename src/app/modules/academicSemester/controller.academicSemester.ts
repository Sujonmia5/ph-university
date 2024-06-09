import catchAsync from '../utils/catchAsync';
import { AcademicSemesterServices } from './service.academicSemester';
import sendResponse from '../utils/sendResponse';
import http_status from 'http-status';

const academicSemesterCreateController = catchAsync(async (req, res) => {
  const data = req.body;
  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDB(data);

  sendResponse(res, {
    statusCode: http_status.OK,
    success: true,
    message: 'Academic Semester create successfully',
    data: result,
  });
});

const academicSemesterGetAll = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterIntoDB();
  sendResponse(res, {
    statusCode: http_status.OK,
    success: true,
    message: 'Academic Semester create successfully',
    data: result,
  });
});

const academicSemesterGetId = catchAsync(async (req, res) => {
  const id = req.params.Id;
  const result =
    await AcademicSemesterServices.AcademicSemesterGetByIdIntoDB(id);
  sendResponse(res, {
    statusCode: http_status.OK,
    success: true,
    message: 'Academic Semester create successfully',
    data: result,
  });
});
const updateAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.Id;
  const body = req.body;
  const result =
    await AcademicSemesterServices.updateAcademicSemesterByIdIntoDB(id, body);
  sendResponse(res, {
    statusCode: http_status.OK,
    success: true,
    message: 'Academic Semester updated successfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  academicSemesterCreateController,
  academicSemesterGetAll,
  academicSemesterGetId,
  updateAcademicSemester,
};
