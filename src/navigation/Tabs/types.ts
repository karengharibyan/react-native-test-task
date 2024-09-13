import { TABS } from "@enums";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type TabBarParamList = Record<TABS, undefined>;

export type TabStackParamProps = BottomTabScreenProps<TabBarParamList>;