import { z } from 'zod';

export const findAllByClassIdSchema = z.object({
  params: z.object({
    classId: z.string().uuid(),
  }),
});

export type FindAllByClassIdType = z.infer<
  typeof findAllByClassIdSchema
>['params'];
