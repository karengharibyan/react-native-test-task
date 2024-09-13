import {View} from 'react-native';
import {styles} from './styles';
import {
  Button,
  ButtonSpinner,
  ButtonText,
  FormControl,
  Heading,
  VStack,
} from '@gluestack-ui/themed';
import {GroceryStackParamProps} from '@navigation/Grocery';
import {GROCERY_STACK} from '@enums';
import {FC, useEffect} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {addOrEditProductSchema} from '@validations';
import {FormTextArea, FormTextInput} from '@components';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {useAddProductApi} from '@api/grocery';
import { dismissKeybaord } from '@utils';

export const GroceryAddProduct: FC<
  GroceryStackParamProps<GROCERY_STACK.ADD_PRODUCT>
> = ({navigation}) => {
  const {mutate, data, isLoading, reset} = useAddProductApi();
  const {control, handleSubmit,formState} = useForm({
    defaultValues: {
      title: '',
      price: 0,
      description: '',
    },
    mode: 'onChange',
    resolver: zodResolver(addOrEditProductSchema),
  });

  const onAddProduct = (formData: z.infer<typeof addOrEditProductSchema>) => {
    mutate(formData);
  };

  useEffect(() => {
    if (!isLoading && data?.status === 201) {
      navigation.canGoBack() && navigation.goBack();
    }
    return reset;
  }, [data]);

  return (
    <View style={styles.root} onStartShouldSetResponder={dismissKeybaord}>
      <FormControl p="$4">
        <VStack space="xl">
          <Heading color="$text900" lineHeight="$md">
            Add Product
          </Heading>
          <VStack space="xs">
            <FormTextInput
              control={control}
              label="Title"
              name="title"
              placeholder="enter title"
              disabled={isLoading}
            />
            <FormTextInput
              control={control}
              label="Price"
              name="price"
              keyboardType="numeric"
              placeholder="enter Price"
              disabled={isLoading}
            />
            <FormTextArea
              control={control}
              label="Description"
              name="description"
              disabled={isLoading}
            />
          </VStack>
          <Button ml="auto" onPress={handleSubmit(onAddProduct)} disabled={!formState.isValid}>
            <ButtonText color="$white">Save</ButtonText>
            {isLoading && <ButtonSpinner marginLeft="$3" />}
          </Button>
        </VStack>
      </FormControl>
    </View>
  );
};
