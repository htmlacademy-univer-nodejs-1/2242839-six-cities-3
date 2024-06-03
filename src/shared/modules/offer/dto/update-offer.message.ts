export const UpdateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  city: {
    invalid: 'city must be Object',
  },
  images: {
    invalidFormat: 'Images must be an array',
  },
  isPremium: {
    invalidFormat: 'Must be Boolean',
  },
  isFavorite: {
    invalidFormat: 'Must be Boolean',
  },
  rating: {
    minValue: 'Minimum price is 1',
    maxValue: 'Maximum price is 5',
    invalidFormat: 'Must be Number',
  },
  type: {
    invalid: 'type must be value from OfferType Enum',
  },
  bedrooms: {
    minValue: 'Minimum bedrooms is 1',
    maxValue: 'Maximum bedrooms is 8',
    invalidFormat: 'Must be Number',
  },
  maxAdults: {
    minValue: 'Minimum maxAdults is 1',
    maxValue: 'Maximum maxAdults is 10',
    invalidFormat: 'Must be Number',
  },
  price: {
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
    invalidFormat: 'Price must be an Number',
  },
  goods: {
    invalidFormat: 'Must be an array',
    invalidAmenityFormat: 'good must be value from Good Enum'
  },
  location: {
    invalidFormat: 'location must be Object',
  },
} as const;
