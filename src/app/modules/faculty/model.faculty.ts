import { Schema, model } from 'mongoose';
import { TFaculty, TFacultyName } from './interface.faculty';

const nameSchema = new Schema<TFacultyName>(
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
  {
    versionKey: false,
    _id: false,
  },
);

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      // unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
    designation: {
      type: String,
      required: true,
    },
    name: {
      type: nameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    dateOfBirth: {
      type: Date,
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
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic_department',
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: '',
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

facultySchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

export const MFaculty = model<TFaculty>('faculty', facultySchema);
