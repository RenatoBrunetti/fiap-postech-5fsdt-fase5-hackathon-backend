import { z } from 'zod';

export const findAllByFeedbackIdSchema = z.object({
  params: z.object({
    feedbackId: z.string().uuid(),
  }),
});

export type FindAllByFeedbackIdType = z.infer<
  typeof findAllByFeedbackIdSchema
>['params'];
