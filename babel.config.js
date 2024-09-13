module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          // This needs to be mirrored in tsconfig.json
          '@src': './src',
          '@components': './src/components',
          '@helpers': './src/helpers',
          '@screens': './src/screens',
          '@validations': './src/validations',
          '@types': './src/types',
          '@styles': './src/styles',
          '@navigation': './src/navigation',
          '@assets': './src/assets',
          '@enums': './src/enums',
          '@configs': './src/configs',
          '@api': './src/api',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@context': './src/context',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
  ],
};
