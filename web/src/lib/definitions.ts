import { z } from 'zod';

export const SigninFormSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(6).trim(),
});

export type SigninFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
    }
  | undefined;
