import {useMutation} from '@tanstack/react-query';
import {
  deleteProduct,
  DeleteProductErrorResponse,
  DeleteProductSuccessResponse,
} from './deleteProduct';

export const useDeleteProductApi = () => {
  const {mutate, isPending, data, error, reset} = useMutation<
    DeleteProductSuccessResponse,
    DeleteProductErrorResponse,
    string
  >({
    mutationFn: deleteProduct,
  });

  return {
    deleteProduct: mutate,
    isLoading: isPending,
    error,
    reset,
    data,
  };
};
