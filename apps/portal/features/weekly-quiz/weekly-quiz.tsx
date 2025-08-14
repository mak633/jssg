import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetCurrentQuiz, useSubmitQuiz } from '@/infrastructure/hooks/use-get-quiz';
import { TranslationKeys } from '@/utils/translation-keys';

import { QuizCongrats } from './components/quiz-congrats';
import { QuizStepper } from './quiz-stepper/quiz-stepper';

const WeeklyQuiz = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const { data: quiz, isLoading } = useGetCurrentQuiz({});
  
  const submitQuiz = useSubmitQuiz({
    quizId: quiz?.id || '',
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  if (isLoading) {
    return <div>{t(TranslationKeys.common.loading)}...</div>;
  }

  if (!quiz) {
    return <div>{t(TranslationKeys.common.notFound)}</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <h1 className="mb-6 text-xl font-semibold">{t(`${quiz.id}.${quiz.title}`)}</h1>
      {submitted ? <QuizCongrats /> : <QuizStepper quiz={quiz} onSubmit={(data) => submitQuiz.mutate(data)} />}
    </div>
  );
};

export default WeeklyQuiz;
