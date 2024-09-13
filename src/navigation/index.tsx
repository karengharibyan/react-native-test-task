import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {TabNavigation} from './Tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {MAIN_STACK} from '@src/enums';
import {Basket} from '@src/screens';
import { Header } from '@src/components';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f6f7f7',
    header: 'transparent',
  },
};

export type MainStackParamList = {
  [MAIN_STACK.GROCERY]: undefined;
  [MAIN_STACK.BASKET]: undefined;
};

export type MainStackParamProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

export type MainScreenNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;

const Stack = createNativeStackNavigator<MainStackParamList>();

export const AppNavigation = () => {
  const navigationRef = useNavigationContainerRef();
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer theme={Theme} ref={navigationRef}>
        <Stack.Navigator initialRouteName={MAIN_STACK.GROCERY}>
          <Stack.Group>
            <Stack.Screen
              name={MAIN_STACK.GROCERY}
              options={{headerShown: false}}
              component={TabNavigation}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'containedModal'}}>
            <Stack.Screen options={{header: Header,title: MAIN_STACK.BASKET}} name={MAIN_STACK.BASKET} component={Basket} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
