import { Request, Response } from 'express';

import { makeAuthUseCase } from '../../../use-cases/factories/make.auth.js';
import { setRefreshTokenCookie } from '../../utils/cookieHelper.js';

import { AuthLoginBody } from './schemas/login.schema.js';

export class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password }: AuthLoginBody = req.body;

    const authUseCase = makeAuthUseCase();
    const authentication = await authUseCase.authenticate(email, password);
    if (!authentication) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    setRefreshTokenCookie(res, authentication.refreshToken);
    return res.status(200).json(authentication);
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;

    const authUseCase = makeAuthUseCase();
    const result = await authUseCase.refreshToken(token);
    setRefreshTokenCookie(res, result.refreshToken);
    return res.status(200).json(result);
  }

  async logout(req: Request, res: Response): Promise<Response> {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    if (token) {
      const authUseCase = makeAuthUseCase();
      await authUseCase.logout(token);
    }

    res.clearCookie('refreshToken');
    return res.status(204).json();
  }
}
