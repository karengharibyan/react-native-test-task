module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@tanstack|@callstack/liquid-glass|react-native-gesture-handler)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components$': '<rootDir>/src/components',
    '^@screens$': '<rootDir>/src/screens',
    '^@hooks$': '<rootDir>/src/hooks',
    '^@utils$': '<rootDir>/src/utils',
    '^@api$': '<rootDir>/src/api',
    '^@types$': '<rootDir>/src/types',
    '^@services$': '<rootDir>/src/services',
    '^@enums$': '<rootDir>/src/enums',
  },
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.styles.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
