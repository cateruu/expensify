import { z } from 'zod';

export const userValidation = z.object({
  name: z.string().min(2, 'name must be at least 2 characters long'),
  email: z.string().email(),
  password: z.string().min(6, 'password must be at least 6 characters long'),
});
