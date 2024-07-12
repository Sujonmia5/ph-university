import { AnyZodObject, z } from 'zod';
import { days } from './constant.offeredCourse';

const startTimeSchema = z
  .string({
    message: 'Start time is required and must be a valid time string.',
  })
  .refine(
    (time) => {
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return regex.test(time);
    },
    {
      message:
        'Invalid time format accepted time format /HH:MM/ 24hours format',
    },
  );

const endTimeSchema = z
  .string({
    message: 'End time is required and must be a valid time string.',
  })
  .refine(
    (time) => {
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return regex.test(time);
    },
    {
      message:
        'Invalid time format accepted time format /HH:MM/ 24hours format',
    },
  );

export const ZodOfferedCourseSchema = z
  .object({
    academicSemester: z.string({
      message: 'Academic semester ID is required and must be a valid ObjectId.',
    }),
    academicFaculty: z.string({
      message: 'Academic faculty ID is required and must be a valid ObjectId.',
    }),
    academicDepartment: z.string({
      message:
        'Academic department ID is required and must be a valid ObjectId.',
    }),
    course: z.string({
      message: 'Course ID is required and must be a valid ObjectId.',
    }),
    faculty: z.string({
      message: 'Faculty ID is required and must be a valid ObjectId.',
    }),
    section: z
      .number()
      .int({ message: 'Section must be an integer.' })
      .nonnegative({ message: 'Section must be a non-negative integer.' }),
    maxCapacity: z
      .number()
      .int({ message: 'Max capacity must be an integer.' })
      .nonnegative({ message: 'Max capacity must be a non-negative integer.' }),

    days: z.array(z.enum([...days] as [string, ...string[]])),

    startTime: startTimeSchema,
    endTime: endTimeSchema,
  })
  .superRefine((val, ctx) => {
    const [startHour, startMinute] = val.startTime.split(':').map(Number);
    const [endHour, endMinute] = val.endTime.split(':').map(Number);
    const start = new Date(0, 0, 0, startHour, startMinute);
    const end = new Date(0, 0, 0, endHour, endMinute);

    if (end < start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'start time should be before end time',
      });
    }
  })._def.schema as AnyZodObject;

export const ZodOfferedCourseUpdateSchema = z
  .object({
    faculty: z.string({
      message: 'Faculty ID is required and must be a valid ObjectId.',
    }),

    maxCapacity: z
      .number()
      .int({ message: 'Max capacity must be an integer.' })
      .nonnegative({ message: 'Max capacity must be a non-negative integer.' }),
    days: z.array(z.enum([...days] as [string, ...string[]])),
    startTime: startTimeSchema,
    endTime: endTimeSchema,
  })
  .superRefine((val, ctx) => {
    const [startHour, startMinute] = val.startTime.split(':').map(Number);
    const [endHour, endMinute] = val.endTime.split(':').map(Number);
    const start = new Date(0, 0, 0, startHour, startMinute);
    const end = new Date(0, 0, 0, endHour, endMinute);

    if (end < start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'start time should be before end time',
      });
    }
  })._def.schema as AnyZodObject;
