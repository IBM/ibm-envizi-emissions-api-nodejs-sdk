import { CommonRequest } from '../../src/interfaces/Api';

const economicActivityAttributionPayload: CommonRequest = {
  time: {
    date: '2025-01-04',
  },
  location: {
    country: 'usa',
  },
  activity: {
    type: 'accomodation',
    value: 1500.12,
    unit: 'usd',
  },
  attribution: {
    outstandingAmount: 500000.0,
    revenue: 2000000.0,
  },
  includeDetails: true,
};

export default economicActivityAttributionPayload;