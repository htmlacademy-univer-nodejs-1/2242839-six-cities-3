import {DocumentType, types} from '@typegoose/typegoose';
import {inject, injectable} from 'inversify';
import IUser from '../models/IUser.ts';
import AppLogger from '../logger/Logger.ts';
import IUserService from './interfaces/IUserService.ts';
import {UserEntity} from '../DB/mongo/entities/UserEntity.ts';
import {Component} from '../settings/component.ts';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(Component.Logger) private readonly logger: AppLogger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: IUser): Promise<DocumentType<UserEntity>> {
    const user = await new UserEntity(dto);

    const result = await this.userModel.create(user);
    this.logger.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }
}
