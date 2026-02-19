import { z } from 'zod';

export const findByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type FindByIdType = z.infer<typeof findByIdSchema>['params'];
