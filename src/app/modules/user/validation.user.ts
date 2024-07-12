import { z } from 'zod';

export const zodStatusUpdatedSchema = z.object({
  status: z.enum(['blocked', 'in-progress'], {
    required_error: 'status is required',
  }),
});
