import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '../baseController/BaseController.ts';
import {Component} from '../../settings/component.ts';
import {UserService} from '../../services/UserService.ts';
import AppLogger from '../../logger/Logger.ts';
import {HttpMethod} from '../httpLogic/httpMethod.ts';
import {HttpError} from '../httpLogic/httpError.ts';
import {fillDTO} from '../../../helpers/fillDTO.ts';
import {CreateUserRequest} from './CreateUserRequest.ts';
import {UserRdo} from '../rdo/UserRdo.ts';
import {LoginUserRequest} from './LoginUserRequest.ts';
import {ValidateDtoMiddleware} from '../../middleware/ValidateDtoMiddleware.ts';
import {CreateUserDTO} from '../../dto/user/CreateUserDTO.ts';
import {LoginUserDTO} from '../../dto/user/LoginUserDTO.ts';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: AppLogger,
    @inject(Component.UserService) private readonly userService: UserService,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController…');
    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDTO)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDTO)]
    });
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body);
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: LoginUserRequest,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
}
