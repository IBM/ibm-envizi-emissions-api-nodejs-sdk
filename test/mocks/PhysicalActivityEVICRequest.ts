import { CommonRequest } from '../../src/interfaces/Api';

const physicalActivityEVICPayload: CommonRequest = {
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
    outstandingAmount: 1000000.0,
    evic: 10000000.0,
  },
  includeDetails: true,
};

export default physicalActivityEVICPayload;