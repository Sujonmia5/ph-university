import { userService } from './service.user';
import sendResponse from '../utils/sendResponse';
import catchAsync from '../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: data } = req.body;
  const result = await userService.createStudentIntoDB(password, data);
  console.log(result);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student created successfully.',
    data: result,
  });
});

export const userController = {
  createStudent,
};
