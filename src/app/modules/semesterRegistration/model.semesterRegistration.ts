import { Schema, model } from 'mongoose';
import { TSemesterRegistration } from './interface.semesterRegistration';
import { semesterRegistrationStatus } from './constants.semesterRegistration';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'academic_semester',
    },
    status: {
      type: String,
      enum: semesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      required: true,
    },
    maxCredit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const MSemesterRegistration = model<TSemesterRegistration>(
  'semester_registration',
  semesterRegistrationSchema,
);
