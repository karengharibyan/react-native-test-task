import {Keyboard} from 'react-native';

export {buildPath} from './api';

export const dismissKeybaord = () => {
  Keyboard.dismiss();
  return true;
};
