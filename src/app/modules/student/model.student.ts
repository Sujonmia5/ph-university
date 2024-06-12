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
      required: [true, 'First name is required'],
    },
    middleName: {
      type: String,
      required: [true, 'Middle name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
  },
  { _id: false },
);

const guardianSchema = new Schema<TGuardian>(
  {
    fatherName: {
      type: String,
      required: [true, 'Father name is required'],
    },
    fatherOccupation: {
      type: String,
      required: [true, 'Father Occupation is required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Father ContactNo is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact is required'],
    },
  },
  { _id: false },
);

const localGuardianSchema = new Schema<TLocalGuardian>(
  {
    name: {
      type: String,
      required: [true, 'Local Guardian is required'],
    },
    occupation: {
      type: String,
      required: [true, 'Local Guardian Occupation is required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Father ContactNo is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact is required'],
    },
  },
  { _id: false },
);

const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
    },
    name: {
      type: studentNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'Other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date is required'],
    },
    bloodGroup: {
      type: String,
      enum: bloodGroups,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian info is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian info is required'],
    },
    profileImage: {
      type: String,
      required: [true, 'Profile Image is required'],
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: [true, 'Semester id is required'],
      ref: 'academic_semester',
    },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Department id is required'],
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
