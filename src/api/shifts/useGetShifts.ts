import { useQuery } from '@tanstack/react-query';
import {
  getShifts,
  GetShiftsErrorResponse,
  GetShiftsSuccessResponse,
} from './getShifts';
import { LocationCoordinates } from '@/types';

export const useGetShifts = (coordinates: LocationCoordinates | null) => {
  const { data, isLoading, error, refetch } = useQuery<
    GetShiftsSuccessResponse,
    GetShiftsErrorResponse
  >({
    queryKey: ['shifts', coordinates?.latitude, coordinates?.longitude],
    queryFn: getShifts,
    enabled: !!coordinates,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return { data: data?.data.data, isLoading, error, refetch };
};
