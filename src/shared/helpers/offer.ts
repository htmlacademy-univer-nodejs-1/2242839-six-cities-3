import {Good, Offer, OfferType, UserType, CityName} from '../types';

export function createOffer(offerData: string): Offer {
  const [
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
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: {
      name: city as CityName,
      location: {
        latitude: Number.parseFloat(coordinates.split(';')[0]),
        longitude: Number.parseFloat(coordinates.split(';')[1])
      }
    },
    previewImage,
    images: images.split(';'),
    isPremium: isPremium.toLowerCase() === 'true',
    isFavorite: isFavorite.toLowerCase() === 'true',
    rating: Number.parseInt(rating, 10),
    type: type as OfferType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    price: Number.parseInt(price, 10),
    goods: goods
      .split(';')
      .map((good) => good as Good),
    host: {
      name,
      email,
      avatarUrl,
      type: userType as UserType
    },
    location: {
      latitude: Number.parseFloat(coordinates.split(';')[0]),
      longitude: Number.parseFloat(coordinates.split(';')[1])
    }
  };
}
