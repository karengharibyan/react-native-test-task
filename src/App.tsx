/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {AppNavigation} from './navigation';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import './utils/responsive';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppContextProvider} from '@context';
import {DatabaseProvider} from '@nozbe/watermelondb/react';
import {database} from './database';
import * as RNFS from 'react-native-fs';

export const queryClient = new QueryClient();

console.log(RNFS.DocumentDirectoryPath);

function App(): React.JSX.Element {

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <DatabaseProvider database={database}>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <GluestackUIProvider config={config}>
              <AppNavigation />
            </GluestackUIProvider>
          </AppContextProvider>
        </QueryClientProvider>
      </DatabaseProvider>
    </GestureHandlerRootView>
  );
}
export default App;
