import { z } from 'zod';

export const assignClassSchema = z.object({
  body: z.object({
    userId: z.string().uuid({ message: 'Invalid User ID' }),
    classId: z.string().uuid({ message: 'Invalid Class ID' }),
    startDate: z.string().pipe(z.coerce.date()),
  }),
});

export type AssignClassType = z.infer<typeof assignClassSchema>['body'];
