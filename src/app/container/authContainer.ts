import {Container} from 'inversify';
import {Component} from '../settings/component.ts';
import IAuthService from '../services/interfaces/IAuthService.ts';
import {AuthExceptionFilter} from '../auth/filter/AuthExceptionFilter.ts';
import {AuthService} from '../services/AuthService.ts';
import {IExceptionFilter} from '../middleware/exeptionFilter/IExeptionFilter.ts';


export function authContainer() {
  const container = new Container();
  container.bind<IAuthService>(Component.AuthService).to(AuthService).inSingletonScope();
  container.bind<IExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return container;
}
