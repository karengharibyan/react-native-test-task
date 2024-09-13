import {useQuery} from '@tanstack/react-query';
import {
  GetProductErrorResponse,
  GetProductSuccessResponse,
  getProduct,
} from './getProduct';
import {QUERY_CACHE_KEYS} from '@api/cacheKeys';

export const useGetProductApi = (id: number) => {
  const {isLoading, data, refetch} = useQuery<
    GetProductSuccessResponse,
    GetProductErrorResponse
  >({
    queryKey: [QUERY_CACHE_KEYS.getProduct, id],
    queryFn: getProduct(id),
    enabled: !!id,
  });

  return {
    getProduct: refetch,
    isLoading,
    product: data?.data,
  };
};
