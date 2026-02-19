import { z } from 'zod';

export const findByRoleNameSchema = z.object({
  params: z.object({
    roleName: z.string().min(1, { message: 'Role name is required' }),
  }),
});

export type FindByRoleNameType = z.infer<typeof findByRoleNameSchema>['params'];
