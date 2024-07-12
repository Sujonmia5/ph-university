import { model, Schema } from 'mongoose';
import { TEnrolledCourse } from './interface.enrolledCourse';

const courseMarksSchema = new Schema(
  {
    classTest1: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    midTerm: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    classTest2: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    finalTerm: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
  },
  {
    versionKey: false,
    _id: false,
  },
);

const enrolledCourseSchema = new Schema(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: 'semester_registration',
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'academic_semester',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'academic_department',
      required: true,
    },
    offeredCourse: {
      type: Schema.Types.ObjectId,
      ref: 'offered_course',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'course',
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'faculty',
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'student',
      required: true,
    },
    isEnrolled: {
      type: Boolean,
      default: true,
    },
    courseMarks: {
      type: courseMarksSchema,
      default: {},
    },
    grade: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'F', 'NA'],
      default: 'NA',
    },
    gradePoints: {
      type: Number,
      min: 0,
      max: 4,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  },
);

export const MEnrolledCourse = model<TEnrolledCourse>(
  'enrolled_course',
  enrolledCourseSchema,
);
