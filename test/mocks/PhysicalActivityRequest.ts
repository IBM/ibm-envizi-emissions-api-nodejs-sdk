import { CommonRequest } from '../../src/interfaces/Api';

const physicalActivityPayload: CommonRequest = {
  time: {
    date: '2025-01-23',
  },
  location: {
    country: 'usa',
  },
  activity: {
    type: 'commercial real estate',
    value: 0.1,
    unit: 'km2',
  },
  attribution: {
    outstandingAmount: 1000000,
    totalEquity: 3000000,
    totalDebt: 2000000,
  },
  includeDetails: true,
};

export default physicalActivityPayload;