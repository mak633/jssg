import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { initialQuiz } from '@shared/lib/dummy-data';
import { ErrorResponse } from '@shared/types';
import { Quiz, QuizAnswers } from '@shared/types/quiz';

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

export function useSubmitQuiz({
  quizId,
  ...options
}: { quizId: string } & Omit<
  UseMutationOptions<
    string,
    AxiosError<ErrorResponse<QuizAnswers>>,
    QuizAnswers
  >,
  'mutationFn'
>) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: () => Promise.resolve('submitted'),
    onSuccess: (response, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: keys.current,
      });

      options.onSuccess?.(response, variables, context);
    },
  });
}
