import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import {IMiddleware} from './IMiddleware.ts';
import {HttpError} from '../controllers/httpLogic/httpError.ts';

export class PrivateRouteMiddleware implements IMiddleware {
  public async execute({ tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!tokenPayload) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
