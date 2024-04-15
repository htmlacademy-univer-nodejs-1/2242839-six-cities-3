import IOffer from '../../models/IOffer.ts';
import {OfferEntity} from '../../DB/mongo/entities/OfferEntity.ts';
import {DocumentType} from '@typegoose/typegoose';

interface IOfferService {
  create(offer: IOffer): Promise<DocumentType<OfferEntity>>;
  findByID(id: string): Promise<DocumentType<OfferEntity | null>>;
}

export default IOfferService;
