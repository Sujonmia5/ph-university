import { userService } from './service.user';
import sendResponse from '../utils/sendResponse';
import catchAsync from '../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: data } = req.body;
  const result = await userService.createStudentIntoDB(
    req.file,
    password,
    data,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty created successfully.',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: data } = req.body;
  const result = await userService.createFacultyIntoDB(
    req.file,
    password,
    data,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty created successfully.',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  const result = await userService.createAdminIntoDB(req.file, password, admin);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin created successfully.',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await userService.changeStatusIntoDB(id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `User Status is change successfully.`,
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const { id, role } = req.user;
  const result = await userService.getMe(id, role);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get Me successfully.',
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
