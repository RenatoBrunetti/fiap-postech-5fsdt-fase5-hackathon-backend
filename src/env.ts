import 'dotenv/config';
import * as z from 'zod';

const schema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  // Bcrypt configuration
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(10),
  // JWT configuration
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET is required'),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  // Database configuration
  DATABASE_USER: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_SSL: z.string().default('false'),
});

const parse = schema.safeParse(process.env);
if (!parse.success) {
  const tree = z.treeifyError(parse.error);
  console.error('Invalid environment variables:', tree);
  throw new Error('Invalid environment variables');
}

export default parse.data;
