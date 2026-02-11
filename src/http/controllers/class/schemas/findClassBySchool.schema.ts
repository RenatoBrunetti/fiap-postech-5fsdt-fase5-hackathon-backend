import { z } from 'zod';

export const findClassBySchoolSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid({ message: 'Invalid School ID' }),
  }),
});

export type FindClassBySchoolType = z.infer<
  typeof findClassBySchoolSchema
>['params'];
