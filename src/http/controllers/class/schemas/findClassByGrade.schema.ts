import { z } from 'zod';

export const findClassByGradeSchema = z.object({
  params: z.object({
    gradeId: z.string().uuid({ message: 'Invalid Grade ID' }),
  }),
});

export type FindClassByGradeType = z.infer<
  typeof findClassByGradeSchema
>['params'];
