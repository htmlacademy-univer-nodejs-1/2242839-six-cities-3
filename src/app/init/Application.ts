import {env} from '../globalVariables.ts';
import {inject, injectable} from 'inversify';
import {Component} from '../component.ts';
import AppLogger from '../logger/Logger.ts';

@injectable()
export default class Application {
  constructor(@inject(Component.Logger) private readonly logger: AppLogger) {
  }

  public async init(): Promise<void> {
    this.logger.logger.info(`App init! PORT: ${env.PORT}!`);
  }
}
