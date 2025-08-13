import { formatDate } from '@shared/lib/utils';
import { Answer, Question, QuestionType } from '@shared/types/quiz';

export const answerModifier = (answer: Answer, question: Question) => {
  if (answer === undefined || answer === null) {
    return '-';
  }

  switch (question.type) {
    case QuestionType.Boolean:
      return answer ? 'Yes' : 'No';
    case QuestionType.Date:
      return formatDate(new Date(answer as string));
    case QuestionType.MultipleChoice:
      return Array.isArray(answer) ? answer.join(', ') : '-';
    default:
      return answer.toString();
  }
};
