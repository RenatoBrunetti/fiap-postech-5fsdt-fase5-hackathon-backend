import { z } from 'zod';

export const assignClassSchema = z.object({
  body: z.object({
    classId: z.string().uuid({ message: 'Invalid Class ID' }),
    userId: z.string().uuid({ message: 'Invalid User ID' }),
    startDate: z.string(),
  }),
});

export type AssignClassType = z.infer<typeof assignClassSchema>['body'];
