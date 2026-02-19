import { z } from 'zod';

export const unassignClassSchema = z.object({
  body: z.object({
    userId: z.string().uuid({ message: 'Invalid User ID' }),
    classId: z.string().uuid({ message: 'Invalid Class ID' }),
    endDate: z.string().pipe(z.coerce.date()),
  }),
});

export type UnassignClassType = z.infer<typeof unassignClassSchema>['body'];
