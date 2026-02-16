import { z } from 'zod';

export const findByUserSchema = z.object({
  params: z.object({
    userId: z.string().uuid({ message: 'Invalid User ID' }),
  }),
});

export type FindByUserType = z.infer<typeof findByUserSchema>['params'];
