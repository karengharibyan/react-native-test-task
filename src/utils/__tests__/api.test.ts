import axios from 'axios';
import Config from 'react-native-config';

// Mock react-native-config
jest.mock('react-native-config', () => ({
  API_URL: 'https://api.test.com',
}));

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Client', () => {
  beforeAll(() => {
    // Import after mocks are set up
    require('../api');
  });

  it('should create axios instance with correct configuration', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: Config.API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  });

  it('should use correct baseURL from config', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'https://api.test.com',
      })
    );
  });

  it('should set correct default headers', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    );
  });

  it('should export apiClient instance', () => {
    const { apiClient } = require('../api');
    expect(apiClient).toBeDefined();
  });
});
