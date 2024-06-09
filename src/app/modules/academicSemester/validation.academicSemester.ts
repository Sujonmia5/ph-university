import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './constant.academicSemester';

const zodAcademicSemesterSchema = z.object({
  name: z.enum([...AcademicSemesterName] as [string, ...string[]], {
    invalid_type_error: 'Academic semester name must be string',
    required_error: 'Academic semester name is required',
  }),
  year: z.string({
    invalid_type_error: 'Semester year must be string',
    required_error: 'Semester year is required',
  }),
  code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
    message: 'Semester code is required',
  }),
  startMonth: z.enum([...Months] as [string, ...string[]], {
    message: 'Semester start month is required',
  }),
  endMonth: z.enum([...Months] as [string, ...string[]], {
    message: 'Semester start month is required',
  }),
});

const zodUpdatedAcademicSemesterSchema = z.object({
  name: z.enum([...AcademicSemesterName] as [string, ...string[]], {
    invalid_type_error: 'Academic semester name must be string',
    required_error: 'Academic semester name is required',
  }),
  year: z
    .string({
      invalid_type_error: 'Semester year must be string',
      required_error: 'Semester year is required',
    })
    .optional(),
  code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
    message: 'Semester code is required',
  }),
  startMonth: z
    .enum([...Months] as [string, ...string[]], {
      message: 'Semester start month is required',
    })
    .optional(),
  endMonth: z
    .enum([...Months] as [string, ...string[]], {
      message: 'Semester start month is required',
    })
    .optional(),
});

export const SemesterZodSchema = {
  zodAcademicSemesterSchema,
  zodUpdatedAcademicSemesterSchema,
};
