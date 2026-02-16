import { Response } from 'express';

import env from '../../env.js';

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge:
      parseInt(env.JWT_REFRESH_EXPIRES_IN.replace('d', '')) *
      24 *
      60 *
      60 *
      1000, // Convert days to milliseconds
  });
};
