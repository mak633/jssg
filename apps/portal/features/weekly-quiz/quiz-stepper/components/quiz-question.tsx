import { TFunction } from 'i18next';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  BooleanForm,
  DateForm,
  LongStringForm,
  MultipleChoiceForm,
  NumberForm,
  OneChoiceForm,
  ShortStringForm,
} from '@shared/components/ui/form';
import { Question, QuestionType } from '@shared/types/quiz';

import { hideQuestion } from '@/utils/filter-quiz';

const renderQuestion = (
  question: Question,
  t: TFunction<'translation', string>,
  tPrefix: string
) => {
  switch (question.type) {
    case QuestionType.ShortString:
      return <ShortStringForm {...question} t={t} tPrefix={tPrefix} />;
    case QuestionType.LongString:
      return <LongStringForm {...question} t={t} tPrefix={tPrefix} />;
    case QuestionType.Number:
      return <NumberForm {...question} t={t} tPrefix={tPrefix} />;
    case QuestionType.Date:
      return <DateForm {...question} t={t} tPrefix={tPrefix} />;
    case QuestionType.Boolean:
      return <BooleanForm {...question} t={t} tPrefix={tPrefix} />;
    case QuestionType.OneChoice:
      return <OneChoiceForm {...question} t={t} tPrefix={tPrefix} />;
    case QuestionType.MultipleChoice:
      return <MultipleChoiceForm {...question} t={t} tPrefix={tPrefix} />;
    default:
      return null;
  }
};

type QuizQuestionProps = {
  quizId: string;
  question: Question;
};
export const QuizQuestion = ({ quizId, question }: QuizQuestionProps) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const dependsOn = question.requiredWhen && watch(question.requiredWhen.qId);
  const hidden =
    question.requiredWhen && hideQuestion(question.requiredWhen, dependsOn);

  if (hidden) {
    return null;
  }

  return renderQuestion(question, t, quizId);
};
