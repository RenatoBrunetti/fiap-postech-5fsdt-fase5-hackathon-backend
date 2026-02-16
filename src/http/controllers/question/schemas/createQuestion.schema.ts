import { z } from 'zod';

export const createQuestionSchema = z.object({
  body: z.object({
    feedbackId: z.string().uuid(),
    questions: z.array(
      z.object({
        title: z.string().min(5).max(250),
        description: z.string().optional(),
        order: z.number().int().positive(),
      }),
    ),
  }),
});

export type CreateQuestionType = z.infer<typeof createQuestionSchema>['body'];
