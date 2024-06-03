import {Container} from 'inversify';
import {OfferService} from './offer-service.interface';
import {Component} from '../../types';
import {OfferEntity, OfferModel} from './offer.entity';
import {DefaultOfferService} from './default-offer.service';
import {types} from '@typegoose/typegoose';
import {Controller} from '../../libs/rest';
import {OfferController} from './offer.controller';

export function offerContainer() {
  const container = new Container();

  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

  return container;
}
