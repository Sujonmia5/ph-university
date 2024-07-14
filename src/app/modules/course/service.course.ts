import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './constants.course';
import { TCourse, TCourseFaculty } from './interface.course';
import { MCourse, MCourseFaculty } from './model.course';
import AppError from '../../Error/appError';
import httpStatus from 'http-status';
import { MFaculty } from '../faculty/model.faculty';

const createdCourseIntoDB = async (payload: TCourse) => {
  const { preRequisiteCourses } = payload;

  if (preRequisiteCourses && preRequisiteCourses.length) {
    const courseId = preRequisiteCourses.map((course) => course.course);
    for (const id of courseId) {
      const data = await MCourse.findById(id);
      if (!data) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'Pre Requisite course is not founded!',
        );
      }
    }
  }
  const result = await MCourse.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    MCourse.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.queryModel;
  const meta = await courseQuery.countTotal();
  return { meta, result };
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await MCourse.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    let returnData;

    const updatedData = await MCourse.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        session,
      },
    );
    returnData = updatedData;
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      //deleted preRequisite filter
      const deletePreRequisite = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      //new preRequisite filter
      const newPreRequisite = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      );

      await MCourse.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletePreRequisite } },
          },
        },
        { new: true, session },
      );

      const updatedCoursePreRequisite = await MCourse.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
        },
        { new: true, session },
      );
      if (!updateCourseIntoDB) {
        throw new AppError(httpStatus.OK, 'Failed to course updated');
      }
      returnData = updatedCoursePreRequisite;
    }
    await session.commitTransaction();
    return returnData;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to updated course');
  } finally {
    await session.endSession();
  }
};

const deletedCourseFromDB = async (id: string) => {
  const result = await MCourse.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignCourseFacultyIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const courseExist = await MCourse.findById(id);

  if (!courseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'course is not founded!');
  }

  if (payload?.faculties?.length) {
    for (const id of payload.faculties) {
      const isFacultiesExist = await MFaculty.findById(id);
      if (!isFacultiesExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not founded!');
      }
    }
  }

  const result = await MCourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload.faculties } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const getCourseFacultyFromDB = async (id: string) => {
  const result = await MCourseFaculty.findOne({ course: id });
  return result;
};

const removeCourseFacultyIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await MCourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload.faculties } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const courseService = {
  createdCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deletedCourseFromDB,
  updateCourseIntoDB,
  assignCourseFacultyIntoDB,
  removeCourseFacultyIntoDB,
  getCourseFacultyFromDB,
};
