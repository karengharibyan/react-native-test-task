import {GROCERY_STACK} from '@enums';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  GroceryAddProduct,
  GroceryEditProduct,
  GroceryMain,
  GroceryProductDetail,
} from '@screens';
import {Header} from '@src/components';

export type GroceryStackParamList = {
  [GROCERY_STACK.MAIN]: undefined;
  [GROCERY_STACK.ADD_PRODUCT]: undefined;
  [GROCERY_STACK.EDIT_PRODUCT]: {
    id: string;
  };
  [GROCERY_STACK.PRODUCT_DETAIL]: {
    id: string;
  };
};

export type GroceryStackParamProps<T extends keyof GroceryStackParamList> =
  NativeStackScreenProps<GroceryStackParamList, T>;

export type SettingsScreenNavigationProp =
  NativeStackNavigationProp<GroceryStackParamList>;

const Stack = createNativeStackNavigator<GroceryStackParamList>();

export const GroceryStack = () => {
  return (
    <Stack.Navigator initialRouteName={GROCERY_STACK.MAIN}>
      <Stack.Screen
        name={GROCERY_STACK.MAIN}
        component={GroceryMain}
        options={{
          header: Header,
          title: 'Grocery',
        }}
      />
      <Stack.Screen
        name={GROCERY_STACK.ADD_PRODUCT}
        component={GroceryAddProduct}
      />
      <Stack.Screen
        name={GROCERY_STACK.EDIT_PRODUCT}
        component={GroceryEditProduct}
      />
      <Stack.Screen
        name={GROCERY_STACK.PRODUCT_DETAIL}
        component={GroceryProductDetail}
        options={{
          header: Header,
          title: 'Product Details',
          headerShown: true,
          headerTransparent: true,
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
};
