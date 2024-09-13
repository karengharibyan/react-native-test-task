import {ErrorType} from '@api/commonTypes';
import {httpClient} from '@api/httpClient';
import {ErrorResponse, SuccessResponse} from '@api/types';
import {API_ROUTES} from '@enums';
import {MutationFunction} from '@tanstack/react-query';
import {buildPath} from '@utils';

export interface DeleteProductResponseType {
  token: string;
}

export type DeleteProductSuccessResponse =
  SuccessResponse<DeleteProductResponseType>;

export type DeleteProductErrorResponse = ErrorResponse<ErrorType>;

export const deleteProduct: MutationFunction<
  DeleteProductSuccessResponse,
  string
> = async id => {
  return httpClient.delete(buildPath(API_ROUTES.GROCERY.DELETE_PRODUCT, {id}));
};
