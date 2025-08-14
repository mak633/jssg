import { Answer, QuestionType, Quiz } from '@shared/types/quiz';

export function buildDefaultValues(quiz: Quiz): Record<string, Answer> {
  const acc: Record<string, Answer> = {};

  for (const q of Object.values(quiz.questions)) {
    switch (q.type) {
      case QuestionType.OneChoice: {
        acc[q.id] = '';
        break;
      }

      case QuestionType.MultipleChoice: {
        acc[q.id] = [];
        break;
      }

      case QuestionType.Boolean: {
        acc[q.id] = null;
        break;
      }

      case QuestionType.Number: {
        acc[q.id] = '';
        break;
      }

      case QuestionType.ShortString:
      case QuestionType.LongString: {
        acc[q.id] = '';
        break;
      }

      case QuestionType.Date: {
        acc[q.id] = '';
        break;
      }
    }
  }

  return acc;
}
