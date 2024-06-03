import {Container} from 'inversify';
import {AuthService} from './auth-service.interface';
import {Component} from '../../types';
import {DefaultAuthService} from './default-auth.service';
import {ExceptionFilter} from '../../libs/rest';
import {AuthExceptionFilter} from './auth.exception-filter';

export const authContainer = () => {
  const container = new Container();

  container.bind<AuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope();
  container.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return container;
};
