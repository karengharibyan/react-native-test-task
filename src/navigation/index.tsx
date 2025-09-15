import { NavigationRoutes } from '@/enums';
import { ShiftDetailsScreen } from '@/screens/ShiftDetails';
import { ShiftsListScreen } from '@/screens/ShiftsList';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator({
  screens: {
    [NavigationRoutes.ShiftsList]: {
      screen: ShiftsListScreen,
    },
    [NavigationRoutes.ShiftDetails]: {
      screen: ShiftDetailsScreen,
    },
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

export const AppNavigation = createStaticNavigation(RootStack);
