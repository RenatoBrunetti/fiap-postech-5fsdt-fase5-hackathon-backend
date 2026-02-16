import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      next();
    } catch (error) {
      // Global error handler will catch this and send a proper response
      next(error);
    }
  };
