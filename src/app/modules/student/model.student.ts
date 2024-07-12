import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentName,
} from './interface.student';
import { bloodGroups } from './constant.student';
import AppError from '../../Error/appError';
import httpStatus from 'http-status';

const studentNameSchema = new Schema<TStudentName>(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const guardianSchema = new Schema<TGuardian>(
  {
    fatherName: {
      type: String,
      required: true,
    },
    fatherOccupation: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const localGuardianSchema = new Schema<TLocalGuardian>(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'user',
    },
    name: {
      type: studentNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'Other'],
        message: '{VALUE} is not a valid gender',
      },
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroups,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImage: {
      type: String,
      default: '',
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic_semester',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'faculty',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic_department',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
    versionKey: false,
  },
);

studentSchema.pre('findOneAndUpdate', async function (next) {
  const { _id } = this.getQuery();
  const isStudentExist = await MStudent.findById(_id);
  if (!isStudentExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student not founded');
  } else if (isStudentExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student already deleted');
  }
  next();
});

studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const MStudent = model<TStudent>('student', studentSchema);
