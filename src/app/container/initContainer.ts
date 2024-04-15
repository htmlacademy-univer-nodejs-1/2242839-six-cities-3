import {Container} from 'inversify';
import Application from '../init/Application.ts';
import {Component} from '../settings/component.ts';
import AppLogger from '../logger/Logger.ts';
import MongoDB from '../DB/mongo/MongoDB.ts';
import IDB from '../DB/IDB.ts';

export const containerInit = () => {
  const container = new Container();

  container.bind<Application>(Component.App).to(Application).inSingletonScope();
  container.bind(Component.Logger).to(AppLogger).inSingletonScope();
  container.bind<IDB>(Component.DB).to(MongoDB).inSingletonScope();

  return container;
};
