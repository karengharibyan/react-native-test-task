import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface IAppLayout extends React.PropsWithChildren {}

const queryClient = new QueryClient();

export const AppLayout: FC<IAppLayout> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        {children}
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};
