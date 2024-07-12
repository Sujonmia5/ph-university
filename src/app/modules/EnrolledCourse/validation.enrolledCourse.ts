import { z } from 'zod';

export const zodEnrolledCourse = z.object({
  offeredCourse: z.string({ required_error: 'Offered course id is required' }),
});

export const zodUpdatedEnrolledCourse = z.object({
  semesterRegistration: z.string({
    required_error: 'Semester Registration id is required',
  }),
  student: z.string({
    required_error: 'Student id is required',
  }),
  offeredCourse: z.string({
    required_error: 'Offered course id is required',
  }),
  courseMarks: z
    .object({
      classTest1: z.number().optional(),
      midTerm: z.number().optional(),
      classTest2: z.number().optional(),
      finalTerm: z.number().optional(),
    })
    .strict(),
});
