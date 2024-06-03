import {Container} from 'inversify';
import {RestApplication} from './rest.application';
import {DatabaseClient, MongoDatabaseClient} from '../shared/libs/database-client';
import {Logger, PinoLogger} from '../shared/libs/logger';
import {Component} from '../shared/types';
import {Config, RestConfig, RestSchema} from '../shared/libs/config';
import {AppExceptionFilter, ExceptionFilter, HttpErrorExceptionFilter} from '../shared/libs/rest';
import {ValidationExceptionFilter} from '../shared/libs/rest/exception-filter/validation.exception-filter';
import {PathTransformer} from '../shared/libs/rest/transform/path-transformer.js';

export function restApplicationContainer() {
  const container = new Container();

  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  container.bind<PathTransformer>(Component.PathTransformer).to(PathTransformer).inSingletonScope();

  return container;
}
