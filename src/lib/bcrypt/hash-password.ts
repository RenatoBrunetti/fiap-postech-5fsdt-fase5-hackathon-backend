import bcrypt from 'bcryptjs';

import env from '../../env.js';

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const saltRounds = Number(env.BCRYPT_SALT_ROUNDS) || 10;
  return bcrypt.hash(plainPassword, saltRounds);
};

export const comparePassword = async (
  plain: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};
