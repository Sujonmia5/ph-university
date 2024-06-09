import { z } from 'zod';

const zodAcademicDepartmentSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic Department name must be string',
    required_error: 'Academic Department is required',
  }),
  academicFaculty: z.string({
    required_error: 'Academic Faculty name is required',
    invalid_type_error: 'Academic Department name must be string',
  }),
});

const zodUpdatedAcademicDepartmentSchema = zodAcademicDepartmentSchema
  .extend({})
  .partial()
  .strict();

export const academicDepartmentZodSchema = {
  zodAcademicDepartmentSchema,
  zodUpdatedAcademicDepartmentSchema,
};
