import {Container} from 'inversify';
import {containerUser} from './userContainer.ts';
import {containerInit} from './initContainer.ts';
import {offerContainer} from './offerContainer.ts';


export const baseContainer = async () => {
  const container = Container.merge(containerInit(), containerUser(), offerContainer());
  return container;
};

