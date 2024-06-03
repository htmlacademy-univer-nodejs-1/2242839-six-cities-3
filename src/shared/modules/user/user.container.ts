import {Container} from 'inversify';
import {UserService} from './user-service.interface';
import {Component} from '../../types';
import {DefaultUserService} from './default-user.service';
import {types} from '@typegoose/typegoose';
import {UserEntity, UserModel} from './user.entity';
import {Controller} from '../../libs/rest';
import {UserController} from './user.controller';

export const userContainer = () => {
  const container = new Container();
  container.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  container.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();

  return container;
};
