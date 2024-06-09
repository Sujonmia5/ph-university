import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './interface.academicDepartment';
import AppError from '../../Error/appError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic_faculty',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const data = this;
  const isDepartmentExist = await MAcademicDepartment.findOne({
    name: data.name,
  });
  if (isDepartmentExist) {
    throw new AppError(400, 'Departments already created!');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const { _id } = this.getQuery();
  const isAcademicFacultyExist = await MAcademicDepartment.findById(_id);

  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found');
  }
  next();
});

export const MAcademicDepartment = model<TAcademicDepartment>(
  'academic_department',
  academicDepartmentSchema,
);
