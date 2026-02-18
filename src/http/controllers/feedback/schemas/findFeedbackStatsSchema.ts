import { z } from 'zod';

export const findFeedbackStatsSchema = z.object({
  params: z.object({
    feedbackId: z.string().uuid(),
  }),
});

export type FindFeedbackStatsType = z.infer<
  typeof findFeedbackStatsSchema
>['params'];
