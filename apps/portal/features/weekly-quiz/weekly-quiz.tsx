import React from 'react';
import { useTranslation } from 'react-i18next';

import { useGetCurrentQuiz } from '@/infrastructure/hooks/use-get-quiz';

import { QuizStepper } from './quiz-stepper/quiz-stepper';

const WeeklyQuiz = () => {
  const { t } = useTranslation();
  const { data: quiz, isLoading } = useGetCurrentQuiz({});

  if (isLoading) {
    return <div>{t('quiz.loading')}...</div>;
  }

  if (!quiz) {
    return <div>{t('quiz.notFound')}</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <h1 className="mb-6 text-xl font-semibold">{quiz.title}</h1>
      <QuizStepper quiz={quiz} />
    </div>
  );
};

export default WeeklyQuiz;
