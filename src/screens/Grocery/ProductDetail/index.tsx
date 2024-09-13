import {View} from 'react-native';
import {styles} from './styles';
import {Heading, Image, Text, VStack} from '@gluestack-ui/themed';
import {GroceryStackParamProps} from '@navigation/Grocery';
import {GROCERY_STACK} from '@enums';
import {FC} from 'react';
import {withObservables, withDatabase} from '@nozbe/watermelondb/react';
import {Product} from '@src/database/models';
import {Database} from '@nozbe/watermelondb';

interface IGroceryProductDetailProps
  extends GroceryStackParamProps<GROCERY_STACK.PRODUCT_DETAIL> {
  product: Product;
}

export const GroceryProductDetailBase: FC<IGroceryProductDetailProps> = ({
  product,
}) => {
  // const {product} = useGetProductApi(route.params.id);

  return (
    <View style={styles.root}>
      <VStack
        padding="$1"
        width="$full"
        marginVertical="$1"
        alignItems="center">
        <Image
          mb="$6"
          h="$72"
          // @ts-expect-error needed to fix
          width="$72"
          alt="sada"
          source={{
            uri: product?.thumbnail,
          }}
        />
        <Heading mb="$1" size="md" textAlign="center">
          {product?.title}
        </Heading>
        <Text size="sm" mb="$0.5" textAlign="center">
          {/* Tag: {product?.tag} */}
        </Text>
        <Text size="sm" mb="$1.5" textAlign="center">
          {product?.price}$
        </Text>
      </VStack>
    </View>
  );
};

const enhance = withObservables(['route', 'database'], ({route, database}) => {
  return {
    product: (database as Database).collections
      .get<Product>('products')
      .findAndObserve(route.params.id),
  };
});

export const GroceryProductDetail = withDatabase(
  enhance(GroceryProductDetailBase),
);
