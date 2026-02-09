import { ZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('**** Validating request ****', {
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      next();
    } catch (error) {
      // Global error handler will catch this and send a proper response
      console.log('**** Validation error ****', error);
      next(error);
    }
  };
