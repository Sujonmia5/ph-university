type TSchedule = {
  startTime: string;
  endTime: string;
};

export const scheduleManagement = (
  existingSchedule: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of existingSchedule) {
    const existingStartTime = new Date(`2000-01-01T${schedule.startTime}`);

    const existingEndTime = new Date(`2000-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`2000-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`2000-01-01T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};

// const result = await MOfferedCourse.aggregate([
//   {
//     $match: {
//       semesterRegistration: currentUpcomingSemester?._id,
//       academicDepartment: isStudentExist?.academicDepartment,
//       academicFaculty: isStudentExist?.academicFaculty,
//     },
//   },
//   {
//     $lookup: {
//       from: 'courses',
//       localField: 'course',
//       foreignField: '_id',
//       as: 'course',
//     },
//   },
//   {
//     $unwind: '$course',
//   },
//   {
//     $lookup: {
//       from: 'enrolled_courses',
//       let: {
//         semesterRegistration: currentUpcomingSemester?._id,
//         studentId: isStudentExist?._id,
//       },
//       pipeline: [
//         {
//           $match: {
//             $expr: {
//               $and: [
//                 {
//                   $eq: ['$semesterRegistration', '$$semesterRegistration'],
//                 },
//                 {
//                   $eq: ['$student', '$$studentId'],
//                 },
//               ],
//             },
//           },
//         },
//       ],
//       as: 'enrollCourses',
//     },
//   },
//   {
//     $lookup: {
//       from: 'enrolled_courses',
//       let: {
//         semesterRegistration: currentUpcomingSemester?._id,
//         studentId: isStudentExist?._id,
//       },
//       pipeline: [
//         {
//           $match: {
//             $expr: {
//               $and: [
//                 {
//                   $eq: ['$student', '$$studentId'],
//                 },
//                 {
//                   $eq: ['$isCompleted', true],
//                 },
//               ],
//             },
//           },
//         },
//       ],
//       as: 'completedCourse',
//     },
//   },
//   {
//     $addFields: {
//       CompletedCourseId: {
//         $map: {
//           input: '$completedCourse',
//           as: 'completed',
//           in: '$$completed.course',
//         },
//       },
//     },
//   },
//   {
//     $addFields: {
//       isPreRequisitesCompleted: {
//         $or: [
//           {
//             $eq: ['$course.preRequisiteCourses', []],
//           },
//           {
//             $setIsSubset: [
//               '$course.preRequisiteCourses.course',
//               '$CompletedCourseId',
//             ],
//           },
//         ],
//       },
//       isAlreadyEnrolled: {
//         $in: [
//           '$course._id',
//           {
//             $map: {
//               input: '$enrollCourses',
//               as: 'enroll',
//               in: '$$enroll.course',
//             },
//           },
//         ],
//       },
//     },
//   },
//   {
//     $match: {
//       isPreRequisitesCompleted: true,
//       isAlreadyEnrolled: false,
//     },
//   },
//   {
//     $project: {
//       enrollCourses: 0,
//       completedCourse: 0,
//       isAlreadyEnrolled: 0,
//       CompletedCourseId: 0,
//     },
//   },
// ]);
