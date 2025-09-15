import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

export const ScreenLayout = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView style={styles.root}>{children}</SafeAreaView>;
};
