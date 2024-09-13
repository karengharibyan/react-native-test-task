import {BasketItem as BasketItemModel, Product} from '@src/database/models';
import {FC, memo} from 'react';
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
  VStack,
} from '@gluestack-ui/themed';
import {withObservables} from '@nozbe/watermelondb/react';
import {database} from '@src/database';

interface IBasketItem {
  item: BasketItemModel;
  product: Product;
}

export const BasketItemBase: FC<IBasketItem> = memo(
  ({item, product}) => {
    const onAddToBasket = () => {
      database.write(async () => {
        item.update(updateItem => {
          updateItem.quantity += 1;
        });
      });
    };

    const onRemoveFromBasket = () => {
      database.write(async () => {
        if (item.quantity > 1) {
          item.update(updateItem => {
            updateItem.quantity -= 1;
          });
          return;
        }
        item.destroyPermanently();
      });
    };

    return (
      <Card size="lg" mb="$5" variant="elevated" backgroundColor="#f6f7f7">
        <HStack justifyContent="space-around" alignItems="center">
          <Image
            mb="$6"
            h={vp(100)}
            width={vp(100)}
            alt="sada"
            source={{
              uri: product.thumbnail,
            }}
          />
          <VStack>
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
                isDisabled={item.quantity === 0}
                onPress={onRemoveFromBasket}>
                <ButtonIcon as={RemoveIcon} w="$4" h="$4" color="$white" />
              </Button>
              <Text marginHorizontal={10}>{item.quantity}</Text>
              <Button
                bgColor="rgba(1, 55, 59, .8)"
                size="xs"
                isDisabled={item.quantity === product.stock}
                onPress={onAddToBasket}>
                <ButtonIcon as={AddIcon} w="$4" h="$4" color="$white" />
              </Button>
            </HStack>
          </VStack>
        </HStack>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.item.quantity !== nextProps.item.quantity;
  },
);

const enhance = withObservables(['item'], ({item}) => ({
  item,
  product: item.product,
}));

export const BasketItem = enhance(BasketItemBase);
