import { z } from 'zod';

export const findGradeByIdSchema = z.object({
  params: z
    .object({
      id: z.string(),
    })
    .required(),
});

export type FindGradeById = z.infer<typeof findGradeByIdSchema>['params'];
