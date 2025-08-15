import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

import { dummyUsers, dummyUsersRecord } from '@shared/lib/dummy-data';
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
  const [cookies] = useCookies();
  const data = Array.isArray(cookies[dummyUsersRecord]) ? cookies[dummyUsersRecord] : dummyUsers;

  return useQuery({
    ...options,
    queryKey: [...keys.getUsers(query), data.length, data],
    queryFn: () =>
      Promise.resolve({
        count: data.length,
        value: data,
      }),
  });
}
