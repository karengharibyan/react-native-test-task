import { View} from 'react-native';
import {styles} from './styles';
import {
  Button,
  ButtonSpinner,
  ButtonText,
  FormControl,
  Heading,
  Spinner,
  VStack,
} from '@gluestack-ui/themed';
import {GroceryStackParamProps} from '@navigation/Grocery';
import {GROCERY_STACK} from '@enums';
import {FC, useEffect} from 'react';
import {addOrEditProductSchema} from '@validations';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {useGetProductApi} from '@api/grocery';
import {FormTextInput, FormTextArea} from '@components';
import {dismissKeybaord} from '@utils';

export const GroceryEditProduct: FC<
  GroceryStackParamProps<GROCERY_STACK.EDIT_PRODUCT>
> = ({ route}) => {
  const {getProduct, product, isLoading} = useGetProductApi(route.params.id);

  const {control, handleSubmit} = useForm({
    defaultValues: {
      title: product?.title ?? '',
      price: product?.price ?? 0,
      description: product?.description ?? '',
    },
    mode: 'onChange',
    resolver: zodResolver(addOrEditProductSchema),
  });

  const onSaveProduct = (formData: z.infer<typeof addOrEditProductSchema>) => {
    console.log(formData);
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (isLoading && !product) {
    return (
      <View style={styles.root}>
        <Spinner size="large" />
      </View>
    );
  }

  return (
    <View style={styles.root} onStartShouldSetResponder={dismissKeybaord}>
      <FormControl p="$4">
        <VStack space="xl">
          <Heading color="$text900" lineHeight="$md">
            Edit Product
          </Heading>
          <VStack space="xs">
            <FormTextInput
              control={control}
              label="Title"
              name="title"
              disabled={isLoading}
              placeholder="enter title"
            />
            <FormTextInput
              control={control}
              label="Price"
              name="price"
              disabled={isLoading}
              keyboardType="numeric"
              placeholder="enter Price"
            />
            <FormTextArea
              control={control}
              disabled={isLoading}
              label="Description"
              name="description"
            />
          </VStack>
          <Button
            ml="auto"
            disabled={isLoading}
            onPress={handleSubmit(onSaveProduct)}>
            <ButtonText color="$white">Save</ButtonText>
            {isLoading && <ButtonSpinner marginLeft="$3" />}
          </Button>
        </VStack>
      </FormControl>
    </View>
  );
};
