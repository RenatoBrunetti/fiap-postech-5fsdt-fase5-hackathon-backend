import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { ApiError } from '../errors/api.errors.js';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // 1. Validation Errors (Zod)
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      issues: error.format(),
    });
  }

  // 2. Business Errors (Our ApiErrors)
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  // 3. Unexpected Errors (Logs for monitoring, but don't expose details to clients)
  console.error('[Internal Error]:', error);

  return res.status(500).json({
    message: 'Internal server error',
  });
}
