import {FC, memo, useCallback, useMemo} from 'react';
import {ListRenderItem, View} from 'react-native';
import {styles} from './styles';
import {Card, FlatList, Heading, Text, VStack} from '@gluestack-ui/themed';
import {MainStackParamProps} from '@src/navigation';
import {MAIN_STACK} from '@src/enums';
import {withDatabase, withObservables} from '@nozbe/watermelondb/react';
import {BasketItem as BasketItemModel} from '@src/database/models';
import {Database} from '@nozbe/watermelondb';
import {BasketItem} from '@components';

interface IBasketProps extends MainStackParamProps<MAIN_STACK.BASKET> {
  items: BasketItemModel[];
  database: Database;
}

export const BasketBase: FC<IBasketProps> = memo(({items}) => {
  const renderBasketItem = useCallback<ListRenderItem<BasketItemModel>>(
    ({item}) => <BasketItem item={item} />,
    [],
  );

  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  return (
    <View style={styles.root}>
      <Card size="md" variant="elevated" mb="$5">
        <Heading size="md" mb="$3">
          Items in the basket
        </Heading>
        <FlatList
          data={items}
          // @ts-expect-error there is a type error in the gluestack-ui types
          renderItem={renderBasketItem}
          maxHeight={vp(500)}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>No items in the basket</Text>}
        />
      </Card>
      <VStack mb="$5" alignItems="flex-end">
        <Text>Total</Text>
        <Text>${totalPrice}</Text>
      </VStack>
    </View>
  );
});

const enhance = withObservables(['database'], ({database}) => {
  return {
    items: (database as Database)
      .get<BasketItemModel>('basket_items')
      .query()
      .observeWithColumns(['quantity']),
  };
});

export const Basket = withDatabase(enhance(BasketBase));
