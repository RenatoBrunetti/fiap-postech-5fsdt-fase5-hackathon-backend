import { z } from 'zod';

export const findByClassSchema = z.object({
  params: z.object({
    classId: z.string().uuid({ message: 'Invalid Class ID' }),
  }),
});

export type FindByClassType = z.infer<typeof findByClassSchema>['params'];
