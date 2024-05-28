import { inject, injectable } from 'inversify';
import {Request, Response} from 'express';
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
import {ValidateObjectIdMiddleware} from '../../middleware/ValidateObjectIdMiddleware.ts';
import {UploadFileMiddleware} from '../../middleware/UploadFileMiddleware.ts';
import {env} from '../../settings/globalVariables.ts';
import IAuthService from '../../services/interfaces/IAuthService.ts';
import {LoggedUserRdo} from '../rdo/LoggedUserRdo.ts';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: AppLogger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.AuthService) private readonly authService: IAuthService,
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
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDTO)]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(env.UPLOAD_DIRECTORY, 'avatar'),
      ]
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
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, {
      email: user.email,
      token,
    });
    this.ok(res, responseData);
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path || env.BASE_USER_IMG
    });
  }

  public async checkAuthenticate({ tokenPayload: { email }}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (! foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }
}
