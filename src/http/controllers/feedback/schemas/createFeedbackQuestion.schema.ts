import { z } from 'zod';

export const createFeedbackQuestionSchema = z.object({
  body: z.object({
    title: z.string().min(5).max(200),
    classId: z.string().uuid(),
    userId: z.string().uuid(),
    questions: z.array(
      z.object({
        title: z.string().min(5).max(250),
        description: z.string().optional(),
        order: z.number().int().positive(),
      }),
    ),
  }),
});

export type CreateFeedbackQuestionType = z.infer<
  typeof createFeedbackQuestionSchema
>['body'];
