import {FC, memo} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {Text} from '@gluestack-ui/themed';
import { TabStackParamProps } from '@navigation/Tabs';

interface Info {}

export const Info: FC<TabStackParamProps> = memo(({}) => {
  return (
    <View style={styles.root}>
      <Text>Info Screen</Text>
    </View>
  );
});
