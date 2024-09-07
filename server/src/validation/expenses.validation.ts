import { z } from 'zod';

export const expenseValidation = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  amount: z.number(),
  date: z.date(),
  userId: z.string(),
});
