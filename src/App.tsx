/**
 * React Native Shifts App
 * Built with React Native CLI, React Query, and Liquid Glass
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import { AppLayout } from '@components';
import { AppNavigation } from './navigation';
import { Config } from 'react-native-config';

console.log('Config.API_URL - ', Config.API_URL);
function App(): React.JSX.Element {
  return (
    <AppLayout>
      <AppNavigation />
    </AppLayout>
  );
}

export default App;
