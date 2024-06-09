import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './interface.academicFaculty';
import AppError from '../../Error/appError';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const { _id } = this.getQuery();
  const isAcademicFacultyExist = await MAcademicFaculty.findById(_id);
  if (!isAcademicFacultyExist) {
    throw new AppError(404, 'Data not found');
  }
  next();
});

export const MAcademicFaculty = model<TAcademicFaculty>(
  'academic_faculty',
  academicFacultySchema,
);
