// Mock react-native-config
jest.mock('react-native-config', () => ({
  API_URL: 'https://api.test.com',
}));

// Mock react-native Alert
jest.mock('react-native', () => {
  const MockedComponents = {
    View: 'View',
    Text: 'Text',
    TouchableOpacity: 'TouchableOpacity',
    Image: 'Image',
    ScrollView: 'ScrollView',
    FlatList: 'FlatList',
    ActivityIndicator: 'ActivityIndicator',
  };

  return {
    ...MockedComponents,
    Alert: {
      alert: jest.fn(),
    },
    PlatformColor: jest.fn((color) => color),
    Platform: {
      OS: 'ios',
      select: jest.fn((obj) => obj.ios || obj.default),
    },
    PermissionsAndroid: {
      request: jest.fn(),
      PERMISSIONS: {
        ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
      },
      RESULTS: {
        GRANTED: 'granted',
      },
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 812 })),
    },
    StyleSheet: {
      create: jest.fn((styles) => styles),
    },
  };
});

// Mock react-native-permissions
jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {
    ANDROID: {
      ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
      ACCESS_COARSE_LOCATION: 'android.permission.ACCESS_COARSE_LOCATION',
    },
    IOS: {
      LOCATION_WHEN_IN_USE: 'ios.permission.LOCATION_WHEN_IN_USE',
    },
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    BLOCKED: 'blocked',
    UNAVAILABLE: 'unavailable',
  },
  request: jest.fn(),
  check: jest.fn(),
}));

// Mock @react-native-community/geolocation
jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
}));

// Mock @callstack/liquid-glass
jest.mock('@callstack/liquid-glass', () => {
  const React = require('react');
  const { View } = jest.requireActual('react-native');
  
  return {
    LiquidGlassView: ({ children, ...props }: any) => {
      return React.createElement(View, props, children);
    },
    isLiquidGlassSupported: false,
  };
});

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  NavigationContainer: ({ children }: any) => children,
  useFocusEffect: jest.fn(),
}));

// Mock @react-navigation/native-stack
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: any) => children,
    Screen: ({ children }: any) => children,
  }),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  SafeAreaView: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock axios
jest.mock('axios');

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({}));

// Global test timeout
jest.setTimeout(10000);
