import { z } from 'zod';

export const findClassByUserSchema = z.object({
  params: z.object({
    userId: z.string().uuid({ message: 'Invalid User ID' }),
  }),
});

export type FindClassByUserType = z.infer<
  typeof findClassByUserSchema
>['params'];
