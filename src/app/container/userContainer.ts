import {Container} from 'inversify';
import {Component} from '../settings/component.ts';
import {UserService} from '../services/UserService.ts';
import IUserService from '../services/interfaces/IUserService.ts';
import {UserEntity, UserModel} from '../DB/mongo/entities/UserEntity.ts';
import {types} from '@typegoose/typegoose';

export const containerUser = () => {
  const container = new Container();

  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  container.bind<IUserService>(Component.UserService).to(UserService).inSingletonScope();

  return container;
};
