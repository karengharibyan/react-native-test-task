// import {TabBar} from '@components';
import {TABS} from '@enums';
import {GroceryStack} from '@navigation/Grocery';
// import {CaseloadStack} from '@navigation/Caseload';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Info} from '@screens';

import {FC} from 'react';

export type TabBarParamList = Record<TABS, undefined>;

export type TabStackParamProps = BottomTabScreenProps<TabBarParamList>;

const Tab = createBottomTabNavigator<TabBarParamList>();

export const TabNavigation: FC = () => {
  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      // tabBar={props => <TabBar {...props} />}
      screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
      initialRouteName={TABS.GROCERY}>
      <Tab.Screen name={TABS.GROCERY} component={GroceryStack} />
      <Tab.Screen name={TABS.INFO} component={Info} />
    </Tab.Navigator>
  );
};
