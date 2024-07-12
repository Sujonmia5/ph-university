import { z } from 'zod';
import { semesterRegistrationStatus } from './constants.semesterRegistration';

const zodSemesterRegistrationSchema = z.object({
  academicSemester: z.string({
    message: 'Academic Semester id is required',
  }),
  status: z.enum([...(semesterRegistrationStatus as [string, ...string[]])], {
    message: 'status is required',
  }),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  minCredit: z.number(),
  maxCredit: z.number(),
});

export { zodSemesterRegistrationSchema };
