import {Good, City, OfferType, Location} from '../../../types';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber, IsObject,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import {UpdateOfferValidationMessage} from './update-offer.message';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, {message: UpdateOfferValidationMessage.title.minLength})
  @MaxLength(100, {message: UpdateOfferValidationMessage.title.maxLength})
  public title?: string;

  @IsOptional()
  @MinLength(20, {message: UpdateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: UpdateOfferValidationMessage.description.maxLength})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: UpdateOfferValidationMessage.postDate.invalidFormat})
  public postDate?: Date;

  @IsOptional()
  @IsObject({message: UpdateOfferValidationMessage.city.invalid})
  public city?: City;

  @IsOptional()
  public previewImage?: string;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.images.invalidFormat})
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite?: boolean;

  @IsOptional()
  @Min(1, {message: UpdateOfferValidationMessage.rating.minValue})
  @Max(5, {message: UpdateOfferValidationMessage.rating.maxValue})
  @IsNumber({maxDecimalPlaces: 1}, {message: UpdateOfferValidationMessage.rating.invalidFormat})
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType, {message: UpdateOfferValidationMessage.type.invalid})
  public type?: OfferType;

  @IsOptional()
  @Min(1, {message: UpdateOfferValidationMessage.bedrooms.minValue})
  @Max(8, {message: UpdateOfferValidationMessage.bedrooms.maxValue})
  @IsNumber({}, {message: UpdateOfferValidationMessage.bedrooms.invalidFormat})
  public bedrooms?: number;

  @IsOptional()
  @Min(1, {message: UpdateOfferValidationMessage.maxAdults.minValue})
  @Max(10, {message: UpdateOfferValidationMessage.maxAdults.maxValue})
  @IsNumber({}, {message: UpdateOfferValidationMessage.maxAdults.invalidFormat})
  public maxAdults?: number;

  @IsOptional()
  @Min(100, {message: UpdateOfferValidationMessage.price.minValue})
  @Max(1000000, {message: UpdateOfferValidationMessage.price.maxValue})
  @IsNumber({}, {message: UpdateOfferValidationMessage.price.invalidFormat})
  public price?: number;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.goods.invalidFormat})
  @IsEnum(Good, {each: true, message: UpdateOfferValidationMessage.goods.invalidAmenityFormat})
  public goods?: Good[];

  @IsOptional()
  @IsNumber({}, {message: UpdateOfferValidationMessage.location.invalidFormat})
  public location?: Location;
}
