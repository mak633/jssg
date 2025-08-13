import { useFormContext } from 'react-hook-form';

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

const renderQuestion = (question: Question) => {
  switch (question.type) {
    case QuestionType.ShortString:
      return <ShortStringForm {...question} />;
    case QuestionType.LongString:
      return <LongStringForm {...question} />;
    case QuestionType.Number:
      return <NumberForm {...question} />;
    case QuestionType.Date:
      return <DateForm {...question} />;
    case QuestionType.Boolean:
      return <BooleanForm {...question} positive="Yes" negative="No" />;
    case QuestionType.OneChoice:
      return <OneChoiceForm {...question} />;
    case QuestionType.MultipleChoice:
      return <MultipleChoiceForm {...question} />;
    default:
      return null;
  }
};

type QuizQuestionPros = {
  question: Question;
};
export const QuizQuestion = ({ question }: QuizQuestionPros) => {
  const { watch } = useFormContext();
  const dependsOn = question.requiredWhen && watch(question.requiredWhen.qId);
  const hidden =
    question.requiredWhen && hideQuestion(question.requiredWhen, dependsOn);

  if (hidden) {
    return null;
  }

  return renderQuestion(question);
};
