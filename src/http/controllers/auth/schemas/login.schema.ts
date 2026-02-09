import { z } from 'zod';

export const authLoginSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export type AuthLoginBody = z.infer<typeof authLoginSchema>['body'];
