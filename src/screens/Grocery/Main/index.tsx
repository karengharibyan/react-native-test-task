import {ListRenderItem} from 'react-native';
import {styles} from './styles';
import {VStack} from '@gluestack-ui/themed';
import {GroceryStackParamProps} from '@navigation/Grocery';
import {GROCERY_STACK} from '@enums';
import {FC, useCallback} from 'react';
import {ProductItem, TagsCarousel} from '@components';
import {FlatGrid} from 'react-native-super-grid';
import {withDatabase, withObservables} from '@nozbe/watermelondb/react';
import {Database, Q} from '@nozbe/watermelondb';
import {Product} from '@src/database/models';

interface IGroceryMainProps extends GroceryStackParamProps<GROCERY_STACK.MAIN> {
  products: Product[];
}

export const GroceryMainBase: FC<IGroceryMainProps> = ({
  navigation,
  products,
}) => {
  const onProductItemPress = useCallback((id: string) => {
    navigation.navigate(GROCERY_STACK.PRODUCT_DETAIL, {id});
  }, []);

  const renderProductItem = useCallback<ListRenderItem<Product>>(({item}) => {
    return (
      <ProductItem product={item} onPress={() => onProductItemPress(item.id)} />
    );
  }, []);

  return (
    <VStack style={styles.root} paddingHorizontal="$5">
      <TagsCarousel />
      <FlatGrid
        itemDimension={130}
        spacing={10}
        data={products ?? []}
        renderItem={renderProductItem}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
};

const enhance = withObservables(['database', 'route'], ({database, route}) => {
  if (route?.params?.selectedTag) {
    return {
      products: (database as Database)
        .get<Product>('products').query(Q.on('product_tags', 'tag_id', route?.params?.selectedTag))
        .observe(),
    };
  }
  return {
    products: (database as Database).get<Product>('products').query().observe(),
  };
});

export const GroceryMain = withDatabase(enhance(GroceryMainBase));
