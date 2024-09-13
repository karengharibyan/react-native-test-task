import {useQuery} from '@tanstack/react-query';
import {GetTagsErrorResponse, GetTagsSuccessResponse, getTags} from './getTags';
import {QUERY_CACHE_KEYS} from '@api/cacheKeys';
import {database} from '@src/database';
import {Tag} from '@src/database/models';

export const useGetTagsApi = () => {
  const {isLoading, data, refetch} = useQuery<
    GetTagsSuccessResponse,
    GetTagsErrorResponse
  >({
    queryKey: [QUERY_CACHE_KEYS.getTags],
    queryFn: getTags(),
  });

  const syncronizeTags = async () => {
    database.write(async () => {
      const tagsCount = await database.get<Tag>('tags').query().fetchCount();
      if (data?.data && tagsCount === 0) {
        for (const tag of data?.data) {
          database.get<Tag>('tags').create(dbTag => {
            dbTag.name = tag.name;
          });
        }
      }
    });
  };

  return {
    getTags: refetch,
    isLoading,
    tags: data?.data,
    syncronizeTags,
  };
};
