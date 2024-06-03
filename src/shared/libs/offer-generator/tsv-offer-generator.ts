import {OfferGenerator} from './offer-generator.interface';
import {Good, MockServerData, OfferType, UserType, CityName} from '../../types';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../helpers';
import dayjs from 'dayjs';

const CITIES_INFO = [
  {
    city: CityName.Paris,
    latitude: 48.85661,
    longitude: 2.351499
  },
  {
    city: CityName.Cologne,
    latitude: 50.938361,
    longitude: 6.959974
  },
  {
    city: CityName.Brussels,
    latitude: 50.846557,
    longitude: 4.351697
  },
  {
    city: CityName.Amsterdam,
    latitude: 52.370216,
    longitude: 4.895168
  },
  {
    city: CityName.Hamburg,
    latitude: 53.550341,
    longitude: 10.000654
  },
  {
    city: CityName.Dusseldorf,
    latitude: 51.225402,
    longitude: 6.776314
  }
];

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 8;

const MIN_ADULTS = 1;
const MAX_ADULTS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);

    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const cityInfo = getRandomItem(CITIES_INFO);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.photos).join(';');
    const isPremium = getRandomItem<string>(['true', 'false']);
    const isFavorite = getRandomItem<string>(['true', 'false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const type = getRandomItem([
      OfferType.Apartment,
      OfferType.Hotel,
      OfferType.House,
      OfferType.Room
    ]);
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS).toString();
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const goods = getRandomItems([
      Good.AirConditioning,
      Good.Fridge,
      Good.Towels,
      Good.BabySeat,
      Good.Washer,
      Good.Breakfast,
      Good.LaptopFriendlyWorkspace
    ]).join(';');
    const name = getRandomItem<string>(this.mockData.names);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarUrl = getRandomItem<string>(this.mockData.avatars);
    const userType = getRandomItem([
      UserType.Regular,
      UserType.Pro
    ]);

    const {city, latitude, longitude} = cityInfo;
    const location = `${latitude};${longitude}`;

    return [
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      name,
      email,
      avatarUrl,
      userType,
      location
    ].join('\t');
  }
}
