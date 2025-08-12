import React from 'react';
import { useTranslation } from 'react-i18next';

import { useGetCurrentQuiz } from '@/infrastructure/hooks/use-get-quiz';

import { QuizStepper } from './components/quiz-stepper';


const WeeklyQuiz = () => {
  const {t} = useTranslation();
  const { data: quiz, isLoading } = useGetCurrentQuiz({});

  if (isLoading) {
    return <div>{t('quiz.loading')}...</div>;
  }

  if (!quiz) {
    return <div>{t('quiz.notFound')}</div>;
  }

  return (
    <div>
      <h1>{t('quiz.title', { title: quiz.title })}</h1>
      <QuizStepper quiz={quiz} />
    </div>
  );
};

export default WeeklyQuiz;
