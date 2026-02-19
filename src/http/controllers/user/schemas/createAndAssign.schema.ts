import { z } from 'zod';

export const createAndAssignSchema = z
  .object({
    body: z.object({
      name: z.string(),
      email: z.string(),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .max(32, 'Password must be at most 32 characters long')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(
          /[^a-zA-Z0-9]/,
          'Password must contain at least one special character',
        ),
      confirmPassword: z.string(),
      document: z.string().length(11),
      roleId: z.string(),
      classId: z.string(),
    }),
  })
  .refine((data) => data.body.password === data.body.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type CreateAndAssignBody = z.infer<typeof createAndAssignSchema>['body'];
