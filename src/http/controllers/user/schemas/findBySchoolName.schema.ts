import { z } from 'zod';

export const findBySchoolSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid({ message: 'Invalid School ID' }),
  }),
});

export type FindBySchoolType = z.infer<typeof findBySchoolSchema>['params'];
