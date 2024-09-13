import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {FC, useCallback, useMemo} from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {styles} from './styles';
import {
  Badge,
  BadgeText,
  ChevronLeftIcon,
  CloseIcon,
  Icon,
  Text,
} from '@gluestack-ui/themed';
import {BasketIcon} from '@src/assets/icons';
import {MAIN_STACK} from '@src/enums';
import {withDatabase, withObservables} from '@nozbe/watermelondb/react';
import {BasketItem} from '@src/database/models';
import {Database} from '@nozbe/watermelondb';

interface Props {
  labelName?: string;
  screenName?: string;
  showLeft?: boolean;
  containerStyles?: ViewStyle;
  paddingBottom?: number;
  right?: React.ReactNode;
  headerLeft?: React.ReactNode;
  marginTop?: number;
  basketItems: BasketItem[];
}

export const HeaderBase: FC<
  (NativeStackHeaderProps | BottomTabHeaderProps) & Props
> = ({
  navigation,
  options,
  containerStyles,
  paddingBottom = vp(12),
  marginTop = 0,
  basketItems,
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
          <Icon as={CloseIcon} w="$8" h="$8" color="#fff" />
        </TouchableOpacity>
      );
    }
    const basketItemsCount = basketItems?.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );
    return (
      <TouchableOpacity style={styles.backBtn} onPress={onBasketPress}>
        {basketItemsCount ? (
          <Badge
            // h={22}
            // w={22}
            bg="$red600"
            borderRadius="$full"
            mb={-15}
            mr={-5}
            zIndex={1}
            variant="solid"
            alignSelf="flex-end">
            <BadgeText color="$white">{basketItemsCount}</BadgeText>
          </Badge>
        ) : null}
        <Icon as={BasketIcon} w="$8" h="$8" color="#fff" />
      </TouchableOpacity>
    );
  }, [options.title, basketItems]);

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

const enhance = withObservables(['database'], ({database}) => ({
  basketItems: (database as Database).collections
    .get<BasketItem>('basket_items')
    .query()
    .observeWithColumns(['quantity']),
}));

export const Header = withDatabase(enhance(HeaderBase));
