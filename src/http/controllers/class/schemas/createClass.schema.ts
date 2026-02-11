import { z } from 'zod';

export const createClassSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    year: z.number().int().min(2026),
    schoolId: z.string().uuid({ message: 'Invalid School ID' }),
    gradeId: z.string().uuid({ message: 'Invalid Grade ID' }),
    active: z.boolean().optional().default(true),
  }),
});

export type CreateClassType = z.infer<typeof createClassSchema>['body'];
