# Shift Finder - React Native App

A modern React Native application for finding and viewing work shifts based on user location. Built with TypeScript and featuring a beautiful glass-morphism UI design.

## 🚀 Features

- **📍 Location-based Shift Discovery** - Automatically finds shifts near your location
- **🎨 Modern Glass UI** - Beautiful liquid glass design using `@callstack/liquid-glass`
- **⚡ Optimized Data Management** - React Query for efficient caching and state management
- **📱 Cross-platform** - Runs on both iOS and Android
- **🔄 Real-time Updates** - Live data synchronization with background refresh
- **🧪 Comprehensive Testing** - Unit tests with Jest and Testing Library
- **🚀 Multi-Environment Support** - Development, Staging, and Production builds

## 🛠 Tech Stack

### Core Technologies
- **React Native 0.81.4** (CLI, no Expo)
- **TypeScript 5.8.3** for type safety
- **React 19.1.0** with React Compiler optimization

### State Management & Data
- **@tanstack/react-query 5.87.4** for server state management
- **Axios 1.12.2** for HTTP requests

### Navigation & UI
- **React Navigation 7.x** (Native Stack Navigator)
- **@callstack/liquid-glass 0.4.0** for glass-morphism effects
- **React Native Gesture Handler 2.28.0** for smooth interactions
- **React Native Safe Area Context 5.6.1** for safe area handling

### Device APIs
- **@react-native-community/geolocation 3.4.0** for location services
- **react-native-permissions 5.4.2** for permission management
- **react-native-config 1.5.9** for environment configuration

### Development Tools
- **ESLint** with React Native configuration and React Query plugin
- **Prettier 2.8.8** for code formatting
- **Jest 29.6.3** with React Native Testing Library
- **Babel** with module resolver and React Compiler
- **Patch Package 8.0.0** for dependency patches

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── commonTypes.ts      # Shared API types
│   ├── types.ts           # API response types
│   ├── index.ts           # API configuration
│   └── shifts/            # Shifts API
│       ├── getShifts.ts   # API calls
│       ├── useGetShifts.ts # React Query hooks
│       └── index.ts
├── components/            # Reusable UI components
│   ├── Layouts/          # Layout components
│   │   ├── AppLayout/    # Main app layout
│   │   └── ScreenLayout/ # Screen-specific layout
│   ├── LoadingSpinner/   # Loading indicator
│   ├── ShiftCard/        # Shift list item
│   └── ShiftDetailsRow/  # Shift detail row
├── screens/              # App screens
│   ├── ShiftsList/       # Shifts list screen
│   └── ShiftDetails/     # Shift details screen
├── hooks/                # Custom React hooks
│   ├── useLocation.ts    # Location management
│   └── index.ts
├── services/             # Business logic services
│   └── location.ts       # Location service
├── navigation/           # Navigation configuration
│   └── index.tsx
├── types/                # TypeScript type definitions
│   ├── global.d.ts       # Global types
│   ├── shift.ts          # Shift data types
│   └── index.ts
├── enums/                # Application enums
│   ├── API_Routes.ts     # API endpoint constants
│   ├── Screens.ts        # Screen name constants
│   └── index.ts
├── utils/                # Utility functions
│   ├── api.ts           # API utilities
│   ├── __tests__/       # Utility tests
│   └── index.ts
├── test-utils/           # Testing utilities
│   ├── setup.ts         # Test setup
│   └── mock-data.ts     # Mock data
└── App.tsx              # Root component
```

## 🏗 Build Configurations

This project supports multiple build configurations for different environments:

### Android
- **Development** (`reactNativeTestTaskDebug`) - Debug build with dev settings
- **Staging Debug** (`reactNativeTestTaskStagingDebug`) - Staging environment in debug mode
- **Staging Release** (`reactNativeTestTaskStagingRelease`) - Staging environment optimized build
- **Production** (`reactNativeTestTaskRelease`) - Production optimized build

### iOS
- **react_native_test_task** - Development/Production scheme
- **react_native_test_task_staging** - Staging environment scheme

Each configuration can have different:
- Bundle IDs (`com.react_native_test_task` vs `com.react_native_test_task.staging`)
- API endpoints
- App icons and display names
- Signing certificates

## 🔧 Prerequisites

Before running this project, ensure you have:

- **Node.js** >= 20
- **Yarn** package manager  
- **React Native CLI** globally installed
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **Ruby** and **Bundler** (for iOS dependency management)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
yarn install
```

### 2. iOS Setup (macOS only)

Install Ruby dependencies for iOS:
```bash
bundle install
```

Install CocoaPods dependencies:
```bash
cd ios && bundle exec pod install && cd ..
```

> **Note:** The project includes a `Gemfile` to ensure consistent Ruby gem versions across development environments.

### 3. Environment Configuration

Create environment files in the root directory:

**.env** (development):
```bash
API_BASE_URL=https://mobile.handswork.pro/api
ENVIRONMENT=development
```

**.env.staging**:
```bash
API_BASE_URL=https://mobile.handswork.pro/api
ENVIRONMENT=staging
```

**.env.production**:
```bash
API_BASE_URL=https://mobile.handswork.pro/api
ENVIRONMENT=production
```

### 4. Start Metro Bundler

```bash
yarn start
```

### 5. Run the App

The app supports multiple build variants for different environments:

**Development:**
```bash
# Android
yarn android

# iOS
yarn ios
```

**Staging:**
```bash
# Android
yarn android:stage

# iOS (use Xcode to select react_native_test_task_staging scheme)
yarn ios --scheme react_native_test_task_staging
```

**Production/Release:**
```bash
# Android
yarn android:release

# iOS (use Xcode to build for release)
yarn ios --configuration Release
```

## 📜 Available Scripts

The project includes several yarn scripts for different development tasks:

- `yarn start` - Start Metro bundler
- `yarn android` - Run Android app in development mode  
- `yarn android:stage` - Run Android app in staging mode
- `yarn android:release` - Run Android app in release mode
- `yarn android:stage:release` - Run Android app in staging release mode
- `yarn ios` - Run iOS app
- `yarn test` - Run unit tests with Jest
- `yarn lint` - Run ESLint code analysis

## 🧪 Testing

Run unit tests:
```bash
yarn test
```

Run tests in watch mode:
```bash
yarn test --watch
```

## 🔍 API Integration

The app integrates with the Handswork API to fetch shift data:

**Endpoint:** `https://mobile.handswork.pro/api/shifts/map-list-unauthorized`

**Parameters:**
- `latitude` - User's latitude coordinate
- `longitude` - User's longitude coordinate

### Shift Data Schema

Each shift object contains:
- `id` - Unique shift identifier
- `logo` - Company logo URL
- `address` - Shift location address
- `companyName` - Employer company name
- `dateStartByCity` - Shift start date
- `timeStartByCity` - Shift start time
- `timeEndByCity` - Shift end time
- `currentWorkers` - Current number of workers assigned
- `planWorkers` - Total workers needed
- `workTypes` - Array of work type descriptions
- `priceWorker` - Payment amount (in rubles)
- `customerFeedbacksCount` - Number of employer reviews
- `customerRating` - Employer rating (1-5 scale)

## 📱 App Flow

1. **Permission Request** - App requests location permission on first launch
2. **Location Detection** - Gets user's current coordinates
3. **Data Fetching** - Loads nearby shifts from API
4. **List Display** - Shows shifts in a beautiful card-based list
5. **Detail View** - Tap any shift to see detailed information

## 🎨 Design System

The app uses a modern glass-morphism design with:
- **Liquid Glass Effects** - Translucent backgrounds with blur
- **Smooth Animations** - Gesture-driven interactions
- **Dark Theme Support** - Adaptive to system preferences
- **Responsive Layout** - Works on all screen sizes

## 🛠 Development Tools

### Linting
```bash
yarn lint
```

### Code Formatting
Prettier is configured to format on save. Manual formatting:
```bash
yarn prettier --write .
```

### Type Checking
TypeScript provides compile-time type checking:
```bash
yarn tsc --noEmit
```

### Dependency Management
Apply patches for modified dependencies:
```bash
yarn patch-package
```

## 🚀 Building for Production

### Android

**Development Build:**
```bash
cd android
./gradlew assembleDebug
```

**Staging Build:**
```bash
cd android
./gradlew assembleStagingRelease
```

**Production Build:**
```bash
cd android
./gradlew assembleRelease
```

### iOS

The project supports multiple schemes for different environments:

1. Open `ios/react_native_test_task.xcworkspace` in Xcode
2. Select the appropriate scheme:
   - `react_native_test_task` - Development/Production
   - `react_native_test_task_staging` - Staging
3. Select "Generic iOS Device" or connected device
4. Product → Archive
5. Follow the App Store deployment process

## 🐛 Troubleshooting

### Common Issues

**Metro bundler cache issues:**
```bash
yarn start --reset-cache
```

**iOS build issues:**
```bash
# Clean and reinstall pods
cd ios && bundle exec pod install --repo-update && cd ..

# Clean Xcode build folder
# In Xcode: Product → Clean Build Folder
```

**Android build issues:**
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..

# Reset Metro cache
yarn start --reset-cache
```

**Node modules issues:**
```bash
# Clean install
rm -rf node_modules yarn.lock
yarn install
```

**Permission issues on Android:**
- Ensure location permissions are granted in device settings
- Check that location services are enabled
- For Android 12+, ensure precise location permission is granted

**iOS Simulator location:**
- Use Simulator → Device → Location → Custom Location
- Or set a custom location in iOS Simulator features

**Environment configuration issues:**
- Ensure `.env` files are properly created in project root
- Restart Metro bundler after changing environment variables
- For iOS, clean and rebuild after env changes

**TypeScript compilation errors:**
```bash
# Check for type errors without emitting files  
yarn tsc --noEmit
```

## 🚀 Performance & Optimization

This app includes several performance optimizations:

- **React Compiler** - Automatic optimization of React components
- **React Query** - Efficient data caching and background updates
- **Gesture Handler** - Smooth native-driven animations
- **Safe Area Context** - Optimized safe area handling
- **Multiple Build Variants** - Separate staging and production configurations

### Development Tips

- Use **React DevTools** for debugging React components
- Use **Flipper** for advanced debugging and network inspection
- Monitor performance with **React Native Performance Monitor**
- Use **ESLint React Query plugin** for query optimization hints

## 📄 License

This project is private and confidential.

## 🤝 Contributing

This is a test task project. For questions or issues, please contact the development team.

---

**Built with ❤️ using React Native, TypeScript, and modern React patterns**

> **Note:** This project demonstrates best practices for React Native development including proper project structure, environment management, testing setup, and performance optimization.