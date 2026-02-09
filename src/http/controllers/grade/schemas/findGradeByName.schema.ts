import { z } from 'zod';

export const findGradeByNameSchema = z.object({
  params: z
    .object({
      name: z.string(),
    })
    .required(),
});

export type FindGradeByName = z.infer<typeof findGradeByNameSchema>['params'];
