import { z } from 'zod';

const zodAcademicFacultySchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic faculty Name must be a string',
    required_error: 'Academic faculty name is required',
  }),
});

export const academicFacultyZodSchema = {
  zodAcademicFacultySchema,
};
