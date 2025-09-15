import { apiClient } from '@utils';
import { API_ROUTES } from '@enums';
import { Shift } from '@types';
import { ErrorType } from '../commonTypes';
import { ErrorResponse, SuccessResponse } from '../types';
import { QueryFunction } from '@tanstack/react-query';

export type GetShiftsSuccessResponse = SuccessResponse<{data: Shift[]}>;

export type GetShiftsErrorResponse = ErrorResponse<ErrorType>;

export const getShifts: QueryFunction<
  GetShiftsSuccessResponse
> = async queryParams =>{
  return apiClient.get(API_ROUTES.SHIFTS, {
    params: {
      latitude:  queryParams.queryKey[1],
      longitude: queryParams.queryKey[2],
    },
  });
}
  
