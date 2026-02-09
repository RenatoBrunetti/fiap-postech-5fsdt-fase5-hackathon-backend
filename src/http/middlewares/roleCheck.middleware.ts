import { Request, Response, NextFunction } from 'express';

export function authorize(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('Authorizing user:', req.user);

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access denied: insufficient permissions',
      });
    }
    return next();
  };
}
