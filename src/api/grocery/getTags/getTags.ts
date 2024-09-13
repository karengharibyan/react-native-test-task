import {httpClient} from '@api/httpClient';
import {ErrorType} from '@api/commonTypes';
import {SuccessResponse, ErrorResponse, QueryRequestFunction} from '@api/types';
import {API_ROUTES} from '@enums';
import { Tag } from '@src/types';

export type GetTagsSuccessResponse = SuccessResponse<Tag[]>;

export type GetTagsErrorResponse = ErrorResponse<ErrorType>;

export const getTags: QueryRequestFunction<GetTagsSuccessResponse> =
  () => async () => {
    return  httpClient.get(API_ROUTES.GROCERY.GET_TAGS);
  };
