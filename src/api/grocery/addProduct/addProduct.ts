import {ErrorType} from '@api/commonTypes';
import {httpClient} from '@api/httpClient';
import {ErrorResponse, SuccessResponse} from '@api/types';
import {API_ROUTES} from '@enums';
import {MutationFunction} from '@tanstack/react-query';
import {addProductSchema} from '@validations';
import {getUniqueId} from 'react-native-device-info';
import {z} from 'zod';

export type AddProductProps = z.infer<typeof addProductSchema>;

export interface AddProductResponseType {
  token: string;
}

export type AddProductSuccessResponse = SuccessResponse<AddProductResponseType>;

export type AddProductErrorResponse = ErrorResponse<ErrorType>;

export const addProduct: MutationFunction<
  AddProductSuccessResponse,
  AddProductProps
> = async data => {
  const device_id = await getUniqueId();
  return httpClient.post(API_ROUTES.GROCERY.CREATE_PRODUCT, {
    ...data,
    user_id: device_id,
  });
};
