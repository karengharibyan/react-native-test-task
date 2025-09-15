import { Shift, LocationCoordinates } from '@/types';

export const mockLocationCoordinates: LocationCoordinates = {
  latitude: 55.7558,
  longitude: 37.6176,
};

export const mockShift: Shift = {
  id: '1',
  logo: 'https://example.com/logo.png',
  address: '123 Test Street, Test City',
  companyName: 'Test Company',
  dateStartByCity: '2024-01-15',
  timeStartByCity: '09:00',
  timeEndByCity: '17:00',
  currentWorkers: 2,
  planWorkers: 5,
  workTypes: [
    {
      id: 1,
      name: 'Cleaning',
      nameGt5: 'Cleaning Services',
      nameLt5: 'Clean',
      nameOne: 'Cleaner',
    },
  ],
  priceWorker: 1500,
  customerFeedbacksCount: 25,
  customerRating: 4.5,
};

export const mockShifts: Shift[] = [
  mockShift,
  {
    ...mockShift,
    id: '2',
    companyName: 'Another Company',
    currentWorkers: 5,
    planWorkers: 5,
    customerRating: 3.8,
    customerFeedbacksCount: 12,
  },
  {
    ...mockShift,
    id: '3',
    companyName: 'Third Company',
    logo: '',
    currentWorkers: 1,
    planWorkers: 3,
    priceWorker: null,
    customerRating: null,
    customerFeedbacksCount: null,
  },
];

export const mockGetShiftsResponse = {
  data: {
    data: mockShifts,
  },
};

export const mockApiError = {
  response: {
    status: 500,
    data: {
      message: 'Internal Server Error',
    },
  },
};

export const mockGeolocationError = {
  code: 1,
  message: 'User denied the request for Geolocation',
};
