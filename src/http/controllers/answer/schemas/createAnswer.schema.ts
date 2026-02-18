import { z } from 'zod';

export const createAnswerSchema = z.object({
  body: z.object({
    feedbackId: z.string().uuid(),
    questions: z
      .array(
        z.object({
          questionId: z.string().uuid(),
          outcome: z.number().int().min(1).max(5),
        }),
      )
      .nonempty({ message: 'At least one question must be answered' }),
  }),
});

export type CreateAnswerType = z.infer<typeof createAnswerSchema>['body'];
