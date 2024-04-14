
import {Container} from 'inversify';
import Application from '../init/Application.ts';
import {Component} from '../settings/component.ts';
import AppLogger from '../logger/Logger.ts';
import MongoDB from '../DB/mongo/MongoDB.ts';
import {containerUser} from './userContainer.ts';
import {containerInit} from './initContainer.ts';
import {offerContainer} from './offerContainer.ts';


export const baseContainer = async () => {
  const container = Container.merge(containerInit(), containerUser(), offerContainer());
  return container;
};

