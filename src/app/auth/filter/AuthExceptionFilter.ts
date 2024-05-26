import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import ExceptionFilter from './ExceptionFilter.ts';
import {Component} from '../../settings/component.ts';
import AppLogger from '../../logger/Logger.ts';
import {BaseUserException} from '../errors/BaseUserException.ts';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: AppLogger
  ) {
    this.logger.logger.info('Register AuthExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.httpStatusCode)
      .json({
        type: 'AUTHORIZATION',
        error: error.message,
      });
  }
}
