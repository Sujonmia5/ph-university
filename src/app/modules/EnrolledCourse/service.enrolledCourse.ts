/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../Error/appError';
import { MOfferedCourse } from '../offeredCourse/model.offeredCourse';
import { MEnrolledCourse } from './model.enrolledCourse';
import { MStudent } from '../student/model.student';
import mongoose from 'mongoose';
import { MSemesterRegistration } from '../semesterRegistration/model.semesterRegistration';
import { MCourse } from '../course/model.course';
import { TEnrolledCourse } from './interface.enrolledCourse';
import { MFaculty } from '../faculty/model.faculty';
import { marksToGradeConverter } from './utils.enrolledCourse';

const createEnrollCourseIntoDB = async (
  userId: string,
  offeredCourse: string,
) => {
  const isOfferedCourseExist = await MOfferedCourse.findById(offeredCourse);
  const isStudent = await MStudent.findOne({ id: userId }).select('_id').lean();

  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'offered course is not founded');
  }
  if (isOfferedCourseExist.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is full!');
  }
  const isStudentEnrolledCourse = await MEnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExist?.semesterRegistration,
    offeredCourse: isOfferedCourseExist?._id,
    course: isOfferedCourseExist?.course,
    student: isStudent?._id,
  });

  if (isStudentEnrolledCourse) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled!');
  }

  // max credits checking

  const newCourseCredit = await MCourse.findById(
    isOfferedCourseExist.course,
  ).select('credits');
  const currentCredit = newCourseCredit?.credits;

  const semesterRegistrationCredit = await MSemesterRegistration.findById(
    isOfferedCourseExist.semesterRegistration,
  ).select('maxCredit');

  // console.log(semesterRegistrationCredit);

  const enrolledCourse = await MEnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExist?.semesterRegistration,
        student: isStudent?._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'courseCreditData',
      },
    },
    {
      $unwind: '$courseCreditData',
    },
    {
      $group: {
        _id: null,
        totalCredit: { $sum: '$courseCreditData.credits' },
      },
    },
  ]);

  const totalCredit = enrolledCourse.length ? enrolledCourse[0].totalCredit : 0;

  if (
    totalCredit &&
    semesterRegistrationCredit?.maxCredit &&
    totalCredit + currentCredit >= semesterRegistrationCredit.maxCredit
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceeded maximum number of credits !',
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await MEnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExist?.semesterRegistration,
          academicDepartment: isOfferedCourseExist?.academicDepartment,
          academicSemester: isOfferedCourseExist?.academicSemester,
          offeredCourse: isOfferedCourseExist._id,
          student: isStudent?._id,
          faculty: isOfferedCourseExist.faculty,
          course: isOfferedCourseExist.course,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Enrolled failed');
    }
    const maxCapacity = isOfferedCourseExist.maxCapacity;

    await MOfferedCourse.findByIdAndUpdate(
      offeredCourse,
      {
        maxCapacity: maxCapacity - 1,
      },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }
};

const updatedEnrollCourseIntoDB = async (
  userId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, student, offeredCourse, courseMarks } = payload;

  const isFaculty = await MFaculty.findOne({ id: userId }, { _id: 1 }).lean();

  if (!isFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not founded');
  }

  const isEnrolledCourseExist = await MEnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
  });

  if (!isEnrolledCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Enroll course is not founded');
  }

  if (String(isFaculty._id) !== String(isEnrolledCourseExist.faculty)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Enroll course is not founded');
  }

  const modifiedData: Record<string, unknown> = {};

  if (courseMarks?.finalTerm) {
    const data = {
      classTest1: isEnrolledCourseExist.courseMarks.classTest1,
      midTerm: isEnrolledCourseExist.courseMarks.midTerm,
      classTest2: isEnrolledCourseExist.courseMarks.classTest2,
      finalTerm: courseMarks.finalTerm,
    };
    const grade = marksToGradeConverter(data);
    modifiedData.grade = grade.grade;
    modifiedData.gradePoints = grade.gradePoints;
    modifiedData.isCompleted = true;
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await MEnrolledCourse.findByIdAndUpdate(
    isEnrolledCourseExist._id,
    modifiedData,
    {
      new: true,
    },
  );

  return result;
};

export const enrollCourseService = {
  createEnrollCourseIntoDB,
  updatedEnrollCourseIntoDB,
};
