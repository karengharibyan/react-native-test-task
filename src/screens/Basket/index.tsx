import {FC, memo, useCallback} from 'react';
import {ListRenderItem, View} from 'react-native';
import {styles} from './styles';
import {FlatList} from '@gluestack-ui/themed';
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

  return (
    <View style={styles.root}>
      <FlatList
        data={items}
        // @ts-expect-error there is a type error in the gluestack-ui types
        renderItem={renderBasketItem}
      />
    </View>
  );
});

const enhance = withObservables(['database'], ({database}) => {
  return {
    items: (database as Database)
      .get<BasketItemModel>('basket_items')
      .query()
      .observe(),
  };
});

export const Basket = withDatabase(enhance(BasketBase));
