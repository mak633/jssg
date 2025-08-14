import { TFunction } from 'i18next';

import { formatDate } from '@shared/lib/utils';
import { Answer, Question, QuestionType } from '@shared/types/quiz';

import { TranslationKeys } from './translation-keys';

export const answerModifier = (answer: Answer, question: Question, quizId: string, t: TFunction<"translation", string>) => {
  if (answer === undefined || answer === null) {
    return '-';
  }

  switch (question.type) {
    case QuestionType.Boolean:
      return answer ? t(TranslationKeys.common.yes) : t(TranslationKeys.common.no);
    case QuestionType.Date:
      return formatDate(new Date(answer as string));
    case QuestionType.MultipleChoice:
      return Array.isArray(answer) ? answer.map(a => t(`${quizId}.${question.options.find(o => o.value === a)?.label}`)).join(', ') : '-';
    case QuestionType.OneChoice:
      return t(`${quizId}.${question.options.find(o => o.value === answer)?.label}`);
    default:
      return answer.toString();
  }
};
