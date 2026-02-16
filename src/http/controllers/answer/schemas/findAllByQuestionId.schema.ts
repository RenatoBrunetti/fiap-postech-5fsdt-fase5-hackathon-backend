import { z } from 'zod';

export const findAllByQuestionIdSchema = z.object({
  params: z.object({
    questionId: z.string().uuid(),
  }),
});

export type FindAllByQuestionIdType = z.infer<
  typeof findAllByQuestionIdSchema
>['params'];
