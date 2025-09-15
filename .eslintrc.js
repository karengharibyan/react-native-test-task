import reactHooks from 'eslint-plugin-react-hooks';

module.exports = {
  root: true,
  extends: ['@react-native', 'react-hooks/recommended'],
  plugins: {
    'react-hooks': reactHooks,
  },
};