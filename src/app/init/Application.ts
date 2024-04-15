import {env} from '../settings/globalVariables.ts';
import {inject, injectable} from 'inversify';
import {Component} from '../settings/component.ts';
import AppLogger from '../logger/Logger.ts';
import IDB from '../DB/IDB.ts';

@injectable()
export default class Application {
  constructor(@inject(Component.Logger) private readonly logger: AppLogger,
              @inject(Component.DB) private readonly db: IDB) {
  }

  public async init(): Promise<void> {
    this.logger.logger.info(`App init! PORT: ${env.PORT}!`);
    await this.db.connect();
  }
}
