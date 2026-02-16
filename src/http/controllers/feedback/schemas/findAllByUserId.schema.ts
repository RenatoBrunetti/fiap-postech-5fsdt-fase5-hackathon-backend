import { z } from 'zod';

export const findAllByUserIdSchema = z.object({
  params: z.object({
    userId: z.string().uuid(),
  }),
});

export type FindAllByUserIdType = z.infer<
  typeof findAllByUserIdSchema
>['params'];
