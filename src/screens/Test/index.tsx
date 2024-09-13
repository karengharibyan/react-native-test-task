import {FC, memo} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface ITestMain {}

export const TestMain: FC<ITestMain> = memo(({}) => {
  return <View style={styles.root}></View>;
});
