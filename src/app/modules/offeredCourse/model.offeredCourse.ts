import { Schema, model } from 'mongoose';
import { TOfferedCourse } from './interface.offeredCourse';
import { days } from './constant.offeredCourse';

const offeredCourseSchema = new Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'semester_registration',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic_semester',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic_faculty',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic_department',
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'course',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'faculty',
    },
    section: {
      type: Number,
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    days: [
      {
        type: String,
        enum: days,
        required: true,
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const MOfferedCourse = model<TOfferedCourse>(
  'offered_course',
  offeredCourseSchema,
);
