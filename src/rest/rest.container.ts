import {Container} from 'inversify';
import {RestApplication} from './rest.application';
import {DatabaseClient, MongoDatabaseClient} from '../shared/libs/database-client';
import {Logger, PinoLogger} from '../shared/libs/logger';
import {Component} from '../shared/types';
import {Config, RestConfig, RestSchema} from '../shared/libs/config';
import {AppExceptionFilter, ExceptionFilter, HttpErrorExceptionFilter} from '../shared/libs/rest';
import {ValidationExceptionFilter} from '../shared/libs/rest/exception-filter/validation.exception-filter';
import {PathTransformer} from '../shared/libs/rest/transform/path-transformer.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<PathTransformer>(Component.PathTransformer).to(PathTransformer).inSingletonScope();

  return restApplicationContainer;
}
