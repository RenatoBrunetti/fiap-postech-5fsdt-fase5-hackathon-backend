import { z } from 'zod';

export const createFeedbackSchema = z.object({
  body: z.object({
    title: z.string().min(5).max(200),
    classId: z.string().uuid(),
    userId: z.string().uuid(),
  }),
});

export type CreateFeedbackType = z.infer<typeof createFeedbackSchema>['body'];
