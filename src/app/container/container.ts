import 'reflect-metadata';
import {Container} from 'inversify';
import Application from '../init/Application.ts';
import {Component} from '../component.ts';
import AppLogger from '../logger/Logger.ts';


export const containerInit = async () => {
  const baseContainer = new Container();
  baseContainer.bind<Application>(Component.App).to(Application);
  baseContainer.bind(Component.Logger).to(AppLogger);

  const app = baseContainer.get<Application>(Component.App);
  await app.init();
};
