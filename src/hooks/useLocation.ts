import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getLocationWithPermission } from '../services/location';
import { LocationCoordinates } from '../types/shift';

interface UseLocationResult {
  coordinates: LocationCoordinates | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => void;
}

export const useLocation = (): UseLocationResult => {
  const [coordinates, setCoordinates] = useState<LocationCoordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const location = await getLocationWithPermission();
      setCoordinates(location);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location';
      setError(errorMessage);
      
      Alert.alert(
        'Location Error',
        'Unable to get your location. Please check your location settings and try again.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Retry', onPress: requestLocation },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-request location on mount
    requestLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    coordinates,
    loading,
    error,
    requestLocation,
  };
};
