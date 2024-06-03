import {Expose, Type} from 'class-transformer';
import {UserRdo} from '../../user/rdo/user.rdo';
import {City, Location} from '../../../types';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: string;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: string[];

  @Expose({ name: 'host'})
  @Type(() => UserRdo)
  public host: UserRdo;

  @Expose()
  public commentCount: number;

  @Expose()
  public location: Location;
}
