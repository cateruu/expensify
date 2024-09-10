import { z } from 'zod';

export const SigninFormSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .trim(),
});

export type SigninFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
    }
  | undefined;

export const SignunFormSchema = z.object({
  name: z.string().min(1, 'Name must not be empty').trim(),
  email: z.string().email().trim(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .trim(),
});

export type SignupFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
    }
  | undefined;
