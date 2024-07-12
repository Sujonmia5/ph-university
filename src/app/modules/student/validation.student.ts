import { z } from 'zod';

// student name zod schema
const nameSchema = z
  .object({
    firstName: z
      .string({
        required_error: 'First name is required',
        invalid_type_error: 'First Name must be a string',
      })
      .max(20, { message: 'First name is more then 20 character' }),
    middleName: z.string().optional(),
    lastName: z
      .string({
        required_error: 'Last name is required',
        invalid_type_error: 'Last Name must be a string',
      })
      .max(20, { message: 'Last name is more then 20 character' }),
  })
  .strict();

// student guardian zod schema
const guardianSchema = z
  .object({
    fatherName: z.string({ message: 'Father name is required' }),
    fatherOccupation: z.string({ message: 'Father Occupation is required' }),
    contactNo: z
      .string({ message: 'guardian phone number is required' })
      .startsWith('01', { message: 'guardian number start with 01' })
      .min(11, { message: 'guardian contact number must be 11 digit' })
      .max(11, { message: 'guardian contact number must be 11 digit' }),
    emergencyContactNo: z
      .string({ message: 'guardian emergency Contact number is required' })
      .startsWith('01', { message: 'guardian number start with 01' })
      .min(11, { message: 'guardian emergency number must be 11 digit' })
      .max(11, { message: 'guardian emergency number must be 11 digit' }),
  })
  .strict();

// student local guardian zod schema
const localGuardianSchema = z
  .object({
    name: z.string({ message: 'Local guardian name is required' }),
    occupation: z.string({ message: 'Local guardian Occupation is required' }),
    contactNo: z
      .string({ message: 'Local guardian phone number is required' })
      .startsWith('01', { message: 'Local guardian number start with 01' })
      .min(11, { message: 'Local guardian number must be 11 digit' })
      .max(11, { message: 'Local guardian number must be 11 digit' }),
    emergencyContactNo: z
      .string({
        message: 'Local guardian emergency Contact number is required',
      })
      .startsWith('01', { message: 'Local guardian number start with 01' })
      .min(11, { message: 'Local guardian Emergency number must be 11 digit' })
      .max(11, { message: 'Local guardian Emergency number must be 11 digit' }),
  })
  .strict();

// student main zod schema
const zodValidationStudentSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more then 20 character' })
    .optional(),
  student: z
    .object({
      name: nameSchema,
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
        invalid_type_error: "'{VALUE} is not a valid',",
      }),
      dateOfBirth: z.string({
        invalid_type_error: 'Date of birth must be a string',
        required_error: 'Date of birth is required',
      }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email address' })
        .endsWith('@gmail.com', { message: 'Invalid gmail address' }),
      contactNo: z
        .string({
          required_error: 'Phone number is required',
          invalid_type_error: 'Phone number must be a string',
        })
        .min(11, { message: 'Phone number must be 11 digit' })
        .max(11, { message: 'Phone number must be 11 digit' }),
      emergencyContactNo: z
        .string({
          required_error: 'Phone number is required',
          invalid_type_error: 'Phone number must be a string',
        })
        .min(11, { message: 'Emergency phone number must be 11 digit' })
        .max(11, { message: 'Emergency phone number must be 11 digit' }),
      presentAddress: z.string({
        message: 'Present address is required',
      }),
      permanentAddress: z.string({
        message: 'Permanent address is required',
      }),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImage: z.string({ message: 'Profile image is required' }),
      admissionSemester: z.string({
        message: 'Admission semester is required',
      }),
      academicDepartment: z.string({
        message: 'Academic Department is required',
      }),
      isDeleted: z.boolean().default(false).optional(),
    })
    .strict(),
});
// .strict();

//
// student updated name zod schema
const updatedNameSchema = nameSchema.extend({}).strict().optional();

// student updated guardian zod schema
const updatedGuardianSchema = z
  .object({
    fatherName: z.string({ message: 'Father name is required' }).optional(),
    fatherOccupation: z
      .string({ message: 'Father Occupation is required' })
      .optional(),
    contactNo: z
      .string({ message: 'guardian phone number is required' })
      .startsWith('01', { message: 'guardian number start with 01' })
      .min(11, { message: 'guardian contact number must be 11 digit' })
      .max(11, { message: 'guardian contact number must be 11 digit' })
      .optional(),
    emergencyContactNo: z
      .string({ message: 'guardian emergency Contact number is required' })
      .startsWith('01', { message: 'guardian number start with 01' })
      .min(11, { message: 'guardian emergency number must be 11 digit' })
      .max(11, { message: 'guardian emergency number must be 11 digit' })
      .optional(),
  })
  .strict();

const updateLocalGuardianSchema = z
  .object({
    name: z.string({ message: 'Local guardian name is required' }).optional(),
    occupation: z
      .string({ message: 'Local guardian Occupation is required' })
      .optional(),
    contactNo: z
      .string({ message: 'Local guardian phone number is required' })
      .startsWith('01', { message: 'Local guardian number start with 01' })
      .min(11, { message: 'Local guardian number must be 11 digit' })
      .max(11, { message: 'Local guardian number must be 11 digit' })
      .optional(),
    emergencyContactNo: z
      .string({
        message: 'Local guardian emergency Contact number is required',
      })
      .startsWith('01', { message: 'Local guardian number start with 01' })
      .min(11, { message: 'Local guardian Emergency number must be 11 digit' })
      .max(11, { message: 'Local guardian Emergency number must be 11 digit' })
      .optional(),
  })
  .strict();
// updated zod validation schema

const ZodValidationUpdatedStudentSchema = z
  .object({
    name: updatedNameSchema,
    gender: z
      .enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
        invalid_type_error: "'{VALUE} is not a valid',",
      })
      .optional(),
    dateOfBirth: z.string({
      invalid_type_error: 'Date of birth must be a string',
      required_error: 'Date of birth is required',
    }),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' })
      .endsWith('@gmail.com', { message: 'Invalid gmail address' }),
    contactNo: z
      .string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string',
      })
      .min(11, { message: 'Phone number must be 11 digit' })
      .max(11, { message: 'Phone number must be 11 digit' }),
    emergencyContactNo: z
      .string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string',
      })
      .min(11, { message: 'Emergency phone number must be 11 digit' })
      .max(11, { message: 'Emergency phone number must be 11 digit' }),
    presentAddress: z.string({
      message: 'Present address is required',
    }),
    permanentAddress: z.string({
      message: 'Permanent address is required',
    }),
    guardian: updatedGuardianSchema,
    localGuardian: updateLocalGuardianSchema,
    profileImage: z.string({ message: 'Profile image is required' }).optional(),
    admissionSemester: z.string({
      message: 'Admission semester is required',
    }),
    isDeleted: z.boolean().default(false).optional(),
  })
  .partial();

export const studentZodSchema = {
  zodValidationStudentSchema,
  ZodValidationUpdatedStudentSchema,
};
