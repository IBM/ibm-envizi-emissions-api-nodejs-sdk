import { CommonRequest } from '../../src/interfaces/Api';

const attributionPayload: CommonRequest = {
  time: {
    date: '2022-01-01',
  },
  location: {
    country: 'usa',
    stateProvince: 'new york',
  },
  activity: {
    type: 'Commercial Real Estate:Office',
    value: 123456.0,
    unit: 'm2',
  },
  attribution: {
    outstandingAmount: 1000000.0,
    propertyValue: 5000000.0,
  },
  includeDetails: true,
};

export default attributionPayload;