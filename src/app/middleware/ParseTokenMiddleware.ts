import {TokenPayload} from '../auth/TokenPayload.ts';
import {IMiddleware} from './IMiddleware.ts';
import {NextFunction, Request, Response} from 'express';
import {jwtVerify} from 'jose';
import {createSecretKey} from 'node:crypto';
import {HttpError} from '../controllers/httpLogic/httpError.ts';
import {StatusCodes} from 'http-status-codes';

function isTokenPayload(payload: unknown): payload is TokenPayload {
  return (
    (typeof payload === 'object' && payload !== null) &&
    ('email' in payload && typeof payload.email === 'string') &&
    ('firstname' in payload && typeof payload.firstname === 'string') &&
    ('lastname' in payload && typeof payload.lastname === 'string') &&
    ('id' in payload && typeof payload.id === 'string')
  );
}

export class ParseTokenMiddleware implements IMiddleware {
  constructor(private readonly jwtSecret: string) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.headers?.authorization?.split(' ');
    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const { payload } = await jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));

      if (isTokenPayload(payload)) {
        req.tokenPayload = { ...payload };
        return next();
      }
    } catch {

      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Invalid token',
        'AuthenticateMiddleware')
      );
    }
  }
}
