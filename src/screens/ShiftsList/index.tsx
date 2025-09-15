import React, { FC } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  PlatformColor,
  ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  LiquidGlassView,
  isLiquidGlassSupported,
} from '@callstack/liquid-glass';
import { useLocation } from '@hooks';
import { LoadingSpinner, ShiftCard } from '@components';
import { Shift } from '@types';
import { styles } from './styles';
import { NavigationRoutes } from '@/enums';
import { useGetShifts } from '@/api';

export const ShiftsListScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    coordinates,
    loading: locationLoading,
    error: locationError,
    requestLocation,
  } = useLocation();
  const {
    data: shifts,
    isLoading: shiftsLoading,
    error: shiftsError,
    refetch,
  } = useGetShifts(coordinates);

  const isLoading = locationLoading || shiftsLoading;

  const handleRefresh = () => {
    if (coordinates) {
      refetch();
    } else {
      requestLocation();
    }
  };

  const renderShiftItem: ListRenderItem<Shift> = ({ item }) => (
    <ShiftCard shift={item}/>
  );

  if (isLoading && !shifts) {
    return (
      <LoadingSpinner
        message={
          locationLoading ? 'Getting your location...' : 'Loading shifts...'
        }
      />
    );
  }

  if (locationError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Location Required</Text>
        <Text style={styles.errorMessage}>
          We need your location to find nearby work shifts.
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={requestLocation}>
          <Text style={styles.retryButtonText}>Enable Location</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (shiftsError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Failed to Load Shifts</Text>
        <Text style={styles.errorMessage}>
          Please check your internet connection and try again.
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LiquidGlassView
        style={[
          styles.header,
          !isLiquidGlassSupported && styles.headerFallback,
        ]}
        effect="regular"
      >
        <Text
          style={[
            styles.title,
            isLiquidGlassSupported && { color: PlatformColor('labelColor') },
          ]}
        >
          Available Shifts
        </Text>
        <Text
          style={[
            styles.subtitle,
            isLiquidGlassSupported && {
              color: PlatformColor('secondaryLabelColor'),
            },
          ]}
        >
          {shifts?.length || 0} shifts found nearby
        </Text>
      </LiquidGlassView>

      <FlatList
        data={shifts || []}
        renderItem={renderShiftItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No shifts found in your area</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleRefresh}
            >
              <Text style={styles.retryButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};
