module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['babel-plugin-react-compiler',
    ['module-resolver',
    {
      root: ['./'],
      alias: {
        '@': './src',
        '@components': './src/components',
        '@screens': './src/screens',
        '@utils': './src/utils',
        '@types': './src/types',
        '@hooks': './src/hooks',
        '@assets': './src/assets',
        '@enums': './src/enums',
      },
    }]
  ],
};
