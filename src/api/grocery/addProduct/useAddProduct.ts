import {useMutation} from '@tanstack/react-query';
import {
  addProduct,
  AddProductErrorResponse,
  AddProductSuccessResponse,
  AddProductProps,
} from './addProduct';

export const useAddProductApi = () => {
  const {mutate, isPending, data, error, reset} = useMutation<
    AddProductSuccessResponse,
    AddProductErrorResponse,
    AddProductProps
  >({
    mutationFn: addProduct,
  });

  return {
    mutate,
    isLoading: isPending,
    error,
    reset,
    data,
  };
};
