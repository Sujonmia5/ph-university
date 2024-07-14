import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { adminService } from './service.admin';

const getAllAdminController = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await adminService.getAllAdminFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetch successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAdminController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await adminService.getSingleAdminFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetch successfully',
    data: result,
  });
});

const updateAdminController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const query = req.body;
  const result = await adminService.updateAdminIntoDB(id, query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetch successfully',
    data: result,
  });
});

const deletedSingleAdminController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await adminService.deleteSingleAdminIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});
export const adminController = {
  getAllAdminController,
  getSingleAdminController,
  updateAdminController,
  deletedSingleAdminController,
};
