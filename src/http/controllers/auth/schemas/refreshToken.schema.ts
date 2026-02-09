import { z } from 'zod';

export const authRefreshTokenSchema = z
  .object({
    cookies: z
      .object({
        refreshToken: z.string().optional(),
      })
      .optional(),
    body: z
      .object({
        refreshToken: z.string().optional(),
      })
      .optional(),
  })
  .refine((data) => data.cookies?.refreshToken || data.body?.refreshToken, {
    message: 'Refresh token must be provided in cookies or body',
    path: ['refreshToken'],
  });

export type AuthRefreshToken = z.infer<typeof authRefreshTokenSchema>;
