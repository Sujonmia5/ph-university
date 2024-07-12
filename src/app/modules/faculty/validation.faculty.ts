import { z } from 'zod';

// Define the TFacultyName schema
const nameSchema = z
  .object({
    firstName: z.string({ message: 'First name is required' }),
    middleName: z.string({ message: 'Middle name is required' }),
    lastName: z.string({ message: 'Last name is required' }),
  })
  .strict();

// Define the TFaculty schema
const zodValidationFacultySchema = z.object({
  password: z.string().optional(),
  faculty: z.object({
    designation: z.string({
      invalid_type_error: 'Designation must be string',
      required_error: 'Designation is required',
    }),
    name: nameSchema.refine((val) => val, { message: 'Name is required' }),
    gender: z.enum(['Male', 'Female', 'other'], {
      message: '{VALUE} is not valid',
    }),
    email: z
      .string({
        invalid_type_error: 'Email must be string',
        required_error: 'Email is required',
      })
      .email({ message: 'Invalid email format' }),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        invalid_type_error: 'Blood group must be string',
      })
      .optional(),
    dateOfBirth: z.string({
      invalid_type_error: 'Date of birth must be string',
      required_error: 'Date of birth is required',
    }),
    contactNo: z
      .string({
        required_error: 'Contact number is required',
        invalid_type_error: 'Contact number must be a string',
      })
      .min(11, { message: 'Contact number must be 11 digit' })
      .max(11, { message: 'Contact number must be 11 digit' }),
    emergencyContactNo: z
      .string({
        required_error: 'Emergency contact number is required',
        invalid_type_error: 'Emergency contact number must be a string',
      })
      .min(11, { message: 'Emergency contact number must be 11 digit' })
      .max(11, { message: 'Emergency contact number must be 11 digit' }),

    academicDepartment: z.string({
      invalid_type_error: 'Department must be string',
      required_error: 'Department is required',
    }),
    permanentAddress: z.string({
      invalid_type_error: 'Permanent address must be string',
      required_error: 'Permanent address is required',
    }),
    presentAddress: z.string({
      invalid_type_error: 'Present address must be string',
      required_error: 'Present address is required',
    }),
    profileImage: z
      .string({
        invalid_type_error: 'Profile image url must be string',
        required_error: 'Profile image url is required',
      })
      .optional(),
  }),
});

export { zodValidationFacultySchema };
