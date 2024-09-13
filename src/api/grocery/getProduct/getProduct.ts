import {httpClient} from '@api/httpClient';
import {Product} from '@types';
import {ErrorType} from '@api/commonTypes';
import {SuccessResponse, ErrorResponse, QueryRequestFunction} from '@api/types';
import {API_ROUTES} from '@enums';
import {buildPath} from '@utils';

export type GetProductSuccessResponse = SuccessResponse<Product>;

export type GetProductErrorResponse = ErrorResponse<ErrorType>;

export const getProduct: QueryRequestFunction<
  GetProductSuccessResponse,
  number
> = id => () => httpClient.get(buildPath(API_ROUTES.GROCERY.GET_PRODUCT, {id}));
