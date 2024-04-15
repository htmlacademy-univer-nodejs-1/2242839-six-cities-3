import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from '../DB/mongo/entities/OfferEntity.ts';
import IOffer from '../models/IOffer.ts';
import IOfferService from './interfaces/IOfferService.ts';
import {inject, injectable} from 'inversify';
import {Component} from '../settings/component.ts';
import AppLogger from '../logger/Logger.ts';
import {UserEntity} from '../DB/mongo/entities/UserEntity.ts';

@injectable()
export class OfferService implements IOfferService {

  constructor(@inject(Component.Logger) private readonly logger: AppLogger,
              @inject(Component.UserModel) private readonly offerModel: types.ModelType<UserEntity>) {
  }

  public async create(offer: IOffer): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(offer);
    this.logger.logger.info(`New offer created: ${offer.name}`);
    return result;
  }

  findByID(id: string): Promise<DocumentType<OfferEntity | null>> {
    return this.offerModel.findById(id).exec();
  }
}
