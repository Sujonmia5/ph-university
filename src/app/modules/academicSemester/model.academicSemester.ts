import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './interface.academicSemester';
import { Months } from './constant.academicSemester';
import AppError from '../../Error/appError';

export const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: ['Autumn', 'Summer', '03'],
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: ['01', '02', '03'],
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
    },
    endMonth: {
      type: String,
      enum: Months,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await MAcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExist) {
    throw new AppError(400, 'Academic semester is already created');
  }

  next();
});

export const MAcademicSemester = model<TAcademicSemester>(
  'academic_semester',
  academicSemesterSchema,
);
