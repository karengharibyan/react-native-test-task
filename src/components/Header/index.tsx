import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {FC, useCallback, useMemo} from 'react';
import { TouchableOpacity, View, ViewStyle} from 'react-native';
import {styles} from './styles';
import {ChevronLeftIcon, CloseIcon, Icon, Text} from '@gluestack-ui/themed';
import {BasketIcon} from '@src/assets/icons';
import {MAIN_STACK} from '@src/enums';

interface Props {
  labelName?: string;
  screenName?: string;
  showLeft?: boolean;
  containerStyles?: ViewStyle;
  paddingBottom?: number;
  right?: React.ReactNode;
  headerLeft?: React.ReactNode;
  marginTop?: number;
}

export const Header: FC<
  (NativeStackHeaderProps | BottomTabHeaderProps) & Props
> = ({
  navigation,
  options,
  containerStyles,
  paddingBottom = vp(12),
  marginTop = 0,
}) => {
  const goBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack();
  }, []);

  const onBasketPress = useCallback(() => {
    navigation.navigate(MAIN_STACK.BASKET);
  }, []);

  const right = useMemo(() => {
    if (options?.title === MAIN_STACK.BASKET) {
      return (
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Icon as={CloseIcon} w="$8" h="$8" color="#fff"/>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.backBtn} onPress={onBasketPress}>
        <Icon as={BasketIcon} w="$8" h="$8" color="#fff" />
      </TouchableOpacity>
    );
  }, [options.title]);

  const left = useMemo(() => {
    if (options?.title === MAIN_STACK.BASKET) {
      return null;
    }
    return (
      navigation.canGoBack() && (
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Icon as={ChevronLeftIcon} w="$8" h="$8" color="#fff" />
        </TouchableOpacity>
      )
    );
  }, [options.title, navigation]);

  return (
    <View style={styles.container}>
        <View
          style={[
            styles.root,
            {
              marginTop: marginTop,
              paddingBottom: paddingBottom,
            },
            containerStyles,
          ]}>
          <View style={styles.lefContainer}>{left}</View>
          {options?.title && <Text style={styles.title}>{options.title}</Text>}
          <View>{right}</View>
        </View>
    </View>
  );
};
