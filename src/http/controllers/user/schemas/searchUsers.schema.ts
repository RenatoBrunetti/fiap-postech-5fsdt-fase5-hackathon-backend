import { z } from 'zod';

export const searchUsersSchema = z.object({
  query: z.object({
    roleName: z.string().min(1, { message: 'Role name is required' }),
    searchQuery: z.string().optional(),
  }),
});

export type SearchUsersType = z.infer<typeof searchUsersSchema>['query'];
