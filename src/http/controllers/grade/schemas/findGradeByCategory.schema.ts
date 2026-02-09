import { z } from 'zod';

export const findGradeByCategorySchema = z.object({
  params: z
    .object({
      category: z.string(),
    })
    .required(),
});

export type FindGradeByCategory = z.infer<
  typeof findGradeByCategorySchema
>['params'];
