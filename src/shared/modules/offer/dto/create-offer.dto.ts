import {Good, City, OfferType, Location} from '../../../types';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber, IsObject,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import {CreateOfferValidationMessage} from './create-offer.message';

export class CreateOfferDto {
  @MinLength(10, {message: CreateOfferValidationMessage.title.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.title.maxLength})
  public title: string;

  @MinLength(20, {message: CreateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: CreateOfferValidationMessage.description.maxLength})
  public description: string;

  @IsObject({message: CreateOfferValidationMessage.city.invalid})
  public city: City;

  public previewImage: string;

  @IsArray({message: CreateOfferValidationMessage.images.invalidFormat})
  public images: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsEnum(OfferType, {message: CreateOfferValidationMessage.type.invalid})
  public type: OfferType;

  @Min(1, {message: CreateOfferValidationMessage.bedrooms.minValue})
  @Max(8, {message: CreateOfferValidationMessage.bedrooms.maxValue})
  @IsNumber({}, {message: CreateOfferValidationMessage.bedrooms.invalidFormat})
  public bedrooms: number;

  @Min(1, {message: CreateOfferValidationMessage.maxAdults.minValue})
  @Max(10, {message: CreateOfferValidationMessage.maxAdults.maxValue})
  @IsNumber({}, {message: CreateOfferValidationMessage.maxAdults.invalidFormat})
  public maxAdults: number;

  @Min(100, {message: CreateOfferValidationMessage.price.minValue})
  @Max(1000000, {message: CreateOfferValidationMessage.price.maxValue})
  @IsNumber({}, {message: CreateOfferValidationMessage.price.invalidFormat})
  public price: number;

  @IsArray({message: CreateOfferValidationMessage.goods.invalidFormat})
  @IsEnum(Good, {each: true, message: CreateOfferValidationMessage.goods.invalidAmenityFormat})
  public goods: Good[];

  public host: string;

  @IsObject({message: CreateOfferValidationMessage.location.invalidFormat})
  public location: Location;

  public postDate: Date;

  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite: boolean;

  @Min(1, {message: CreateOfferValidationMessage.rating.minValue})
  @Max(8, {message: CreateOfferValidationMessage.rating.maxValue})
  @IsNumber({}, {message: CreateOfferValidationMessage.rating.invalidFormat})
  public rating: number;
}
