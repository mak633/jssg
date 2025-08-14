import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { dummyUsers } from '@shared/lib/dummy-data';
import { PaginatedResponse, QueryOptions } from '@shared/types/base';
import { User } from '@shared/types/user';

import { environment } from '@/environment';

const keys = {
  all: [`${environment.API_GATEWAY_BASE_URL}/api/v1/users`] as const,
  getUsers: (query: QueryOptions) => [...keys.all, query] as const,
};

export function useGetUsers({
  query,
  ...options
}: { query: QueryOptions } & Omit<
  UseQueryOptions<PaginatedResponse<User>>,
  'queryKey' | 'queryFn'
>) {
  return useQuery({
    ...options,
    queryKey: [...keys.getUsers(query), dummyUsers.length, dummyUsers],
    queryFn: () =>
      Promise.resolve({
        count: dummyUsers.length,
        value: dummyUsers,
      }),
  });
}
