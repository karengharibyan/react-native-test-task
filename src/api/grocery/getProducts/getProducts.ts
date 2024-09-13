import {httpClient} from '@api/httpClient';
import {Product} from '@types';
import {ErrorType} from '@api/commonTypes';
import {SuccessResponse, ErrorResponse, QueryRequestFunction} from '@api/types';
import {API_ROUTES} from '@enums';
import {getUniqueId} from 'react-native-device-info';

export type GetProductsSuccessResponse = SuccessResponse<Product[]>;

export type GetProductsErrorResponse = ErrorResponse<ErrorType>;

export const getProducts: QueryRequestFunction<GetProductsSuccessResponse> =
  () => async () => {
    const device_id = await getUniqueId();
    return httpClient.get(API_ROUTES.GROCERY.GET_PRODUCTS, {
      params: {user_id: device_id},
    });
  };
