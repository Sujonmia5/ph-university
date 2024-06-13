import { z } from 'zod';

// Define the Zod schema for the preRequisiteCourses
const preRequisiteCoursesSchema = z.object({
  course: z.string({
    message: 'Course ID is required and must be a valid ObjectId.',
  }),
  isDeleted: z.boolean().optional().default(false),
});

// Define the Zod schema for the course
const zodCourseSchema = z.object({
  title: z.string({ message: 'Title is required.' }),
  prefix: z.string({ message: 'Prefix is required.' }),
  code: z
    .number()
    .int({ message: 'Code must be an integer.' })
    .nonnegative({ message: 'Code must be a positive number.' }),
  credits: z
    .number()
    .int({ message: 'Credits must be an integer.' })
    .nonnegative({ message: 'Credits must be a positive number.' }),
  preRequisiteCourses: z.array(preRequisiteCoursesSchema).optional(),
  isDeleted: z.boolean().optional().default(false),
});

const zodUpdatedSchema = zodCourseSchema.extend({}).partial();

const zodCourseFacultySchema = z.object({
  faculties: z.array(z.string()),
});
export { zodCourseSchema, zodUpdatedSchema, zodCourseFacultySchema };
