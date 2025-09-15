import { RootStackParamList } from '@/navigation';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
    APP_NAME?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
