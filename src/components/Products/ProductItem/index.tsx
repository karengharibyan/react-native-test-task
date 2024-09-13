import {
  AddIcon,
  Button,
  ButtonIcon,
  Card,
  Heading,
  HStack,
  Image,
  RemoveIcon,
  Text,
} from '@gluestack-ui/themed';
import React, {FC, memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {BasketItem, Product} from '@src/database/models';
import {withObservables} from '@nozbe/watermelondb/react';
import {database} from '@src/database';
import {Q} from '@nozbe/watermelondb';

interface IProductItemProps {
  product: Product;
  basket: BasketItem[];
  onPress?: () => void;
}

export const ProductItemBase: FC<IProductItemProps> = memo(
  ({product, basket, onPress}) => {
    const onAddToBasket = () => {
      database.write(async () => {
        const exists = await database
          .get<BasketItem>('basket_items')
          .query(Q.where('product_id', product.id))
          .fetch();
        if (exists.length) {
          await exists[0].update(item => {
            item.quantity += 1;
          });
          return;
        }
        await database.get<BasketItem>('basket_items').create(item => {
          // @ts-expect-error there is a type error in the watermelondb types
          item.product.set(product);
          item.quantity = 1;
        });
      });
    };

    const onRemoveFromBasket = () => {
      database.write(async () => {
        const exists = await database
          .get<BasketItem>('basket_items')
          .query(Q.where('product_id', product.id))
          .fetch();
        if (exists.length) {
          if (exists[0].quantity > 1) {
            await exists[0].update(item => {
              item.quantity -= 1;
            });
            return;
          }
          await exists[0].destroyPermanently();
        }
      });
    };

    return (
      <TouchableOpacity onPress={onPress} style={styles.root}>
        <Card size="sm" variant="elevated">
          <Image
            mb="$6"
            h={vp(130)}
            width={vp(130)}
            alt="sada"
            source={{
              uri: product.thumbnail,
            }}
          />
          <Heading mb="$1" size="md" textAlign="center">
            {product.title}
          </Heading>
          {/* <Text size="sm" mb="$0.5" textAlign="center">Tag: {product.tags.}</Text> */}
          <Text size="sm" mb="$0.5" textAlign="center">
            In Stock: {product.stock}
          </Text>
          <Text size="sm" mb="$1.5" textAlign="center">
            {product.price}$
          </Text>
          <HStack justifyContent="space-evenly" alignItems="center">
            <Button
              bgColor="rgba(1, 55, 59, .8)"
              size="xs"
              onPress={onRemoveFromBasket}>
              <ButtonIcon as={RemoveIcon} w="$4" h="$4" color="$white" />
            </Button>
            <Text>{basket?.[0]?.quantity ?? 0}</Text>
            <Button
              bgColor="rgba(1, 55, 59, .8)"
              size="xs"
              onPress={onAddToBasket}>
              <ButtonIcon as={AddIcon} w="$4" h="$4" color="$white" />
            </Button>
          </HStack>
        </Card>
      </TouchableOpacity>
    );
  },
);

const enhance = withObservables(['product'], ({product}) => ({
  product,
  basket: database.collections
    .get<BasketItem>('basket_items')
    .query(Q.where('product_id', product.id))
    .observeWithColumns(['quantity']),
}));

export const ProductItem = enhance(ProductItemBase);
