import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { initialQuiz } from '@shared/lib/dummy-data';
import { Quiz } from '@shared/types/quiz';

import { environment } from '@/environment';

const keys = {
  all: [`${environment.API_GATEWAY_BASE_URL}/api/v1/quizzes`] as const,
  current: [
    `${environment.API_GATEWAY_BASE_URL}/api/v1/quizzes/current`,
  ] as const,
};

export function useGetCurrentQuiz({
  ...options
}: Omit<UseQueryOptions<Quiz>, 'queryKey'>) {
  return useQuery({
    ...options,
    queryKey: keys.current,
    queryFn: () => Promise.resolve(initialQuiz),
  });
}
