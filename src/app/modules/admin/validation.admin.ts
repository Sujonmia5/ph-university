import { z } from 'zod';

// Define the Zod schema for TAdminName
const zodAdminName = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  middleName: z.string().min(1, { message: 'Middle name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

// Define the Zod schema for TAdmin
const zodAdminValidationSchema = z.object({
  password: z.string().min(6).optional(),
  admin: z.object({
    designation: z.string().min(1, { message: 'Designation is required' }),
    name: zodAdminName.refine((val) => val, { message: 'Name is required' }),
    gender: z.string({ message: 'Gender is required' }),
    dateOfBirth: z.string({ message: 'Date of birth is required' }),
    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
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
    presentAddress: z.string({ message: 'Present address is required' }),
    permanentAddress: z.string({ message: 'Permanent address is required' }),
    profileImage: z.string({ message: 'Profile image is required' }),
    isDeleted: z.boolean().optional(),
  }),
});

// Export the Zod schemas
export { zodAdminValidationSchema };
