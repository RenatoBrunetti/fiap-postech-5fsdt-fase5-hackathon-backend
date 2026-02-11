import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import env from '../../env.js';

interface JwtPayload {
  sub: string;
  role: string;
}

export function jwtAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      code: 'token.missing',
      message: 'Authentication token is required',
    });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      code: 'token.invalid',
      message: 'Authentication token is invalid',
    });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    return next();
  } catch (err) {
    const message =
      err instanceof jwt.TokenExpiredError ? 'Token expired' : 'Invalid token';
    return res.status(401).json({
      code: ',token.invalid',
      message,
    });
  }
}
