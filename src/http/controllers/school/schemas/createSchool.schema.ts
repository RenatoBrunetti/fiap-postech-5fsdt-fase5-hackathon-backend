import { z } from 'zod';

export const createSchoolSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(200),
    document: z.string().length(14),
  }),
});

export type CreateSchoolType = z.infer<typeof createSchoolSchema>['body'];
