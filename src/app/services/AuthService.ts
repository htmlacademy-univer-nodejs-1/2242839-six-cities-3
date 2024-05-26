import {inject, injectable} from 'inversify';
import {Component} from '../settings/component.ts';
import AppLogger from '../logger/Logger.ts';
import {UserService} from './UserService.ts';
import IAuthService from './interfaces/IAuthService.ts';
import {UserEntity} from '../DB/mongo/entities/UserEntity.ts';
import * as crypto from 'node:crypto';
import {env} from '../settings/globalVariables.ts';
import {TokenPayload} from '../auth/TokenPayload.ts';
import {SignJWT} from 'jose';
import {JWT_ALGORITHM, JWT_EXPIRED} from '../auth/authData.ts';
import {LoginUserDTO} from '../dto/user/LoginUserDTO.ts';
import {UserPasswordIncorrectException} from '../auth/errors/UserPasswordIncorrectException.ts';
import {UserNotFoundException} from '../auth/errors/UserNotFoundException.ts';


@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: AppLogger,
    @inject(Component.UserService) private readonly userService: UserService
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const secretKey = crypto.createSecretKey(env.JWT_SECRET, 'utf-8');
    const tokenPayload: TokenPayload = {
      email: user.email,
      firstname: user.name,
      id: user.id,
    };

    this.logger.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDTO): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      this.logger.logger.warn(`User with ${dto.email} not found`);
      throw new UserNotFoundException();
    }

    if (!await user.verifyPassword(dto.password)) {
      this.logger.logger.warn(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }


}
