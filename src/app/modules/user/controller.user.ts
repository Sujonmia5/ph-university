import { userService } from './service.user';
import sendResponse from '../utils/sendResponse';
import catchAsync from '../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: data } = req.body;
  const result = await userService.createStudentIntoDB(password, data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty created successfully.',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: data } = req.body;
  const result = await userService.createFacultyIntoDB(password, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student created successfully.',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  const result = await userService.createAdminIntoDB(password, admin);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty created successfully.',
    data: result,
  });
});
export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
