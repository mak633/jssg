import { Condition, Question, QuizAnswers } from '@shared/types/quiz';

export const hideQuestion = (condition: Condition, value?: unknown) => {
  switch (condition.op) {
    case 'isTruthy':
    case 'isFalsy':
      return !value;
    case 'eq':
      return value !== condition.value;
    case 'neq':
      return value === condition.value;
    default:
      return false;
  }
};

export const filterQuestionsBasedOnAnswer = (
  qList: string[],
  allQuestions: Record<string, Question>,
  answers: QuizAnswers
): string[] => {
  return qList.filter((qId) => {
    const requiredWhen = allQuestions[qId].requiredWhen;
    if (!requiredWhen) return true;
    const parentId = allQuestions[requiredWhen.qId]?.id;
    const parentAnswer = answers[parentId];

    return !hideQuestion(requiredWhen, parentAnswer);
  });
};

export const filterAnswersBasedOnQuestion = (
  answers: QuizAnswers,
  allQuestions: Record<string, Question>
): QuizAnswers => {
  const filteredAnswers: QuizAnswers = {};

  for (const [key, value] of Object.entries(answers)) {
    const requiredWhen = allQuestions[key].requiredWhen;

    if (!requiredWhen) {
      filteredAnswers[key] = value;
      continue;
    }

    const parentId = allQuestions[requiredWhen.qId]?.id;
    const parentAnswer = answers[parentId];

    if (!hideQuestion(requiredWhen, parentAnswer)) {
      filteredAnswers[key] = value;
    }
  }

  return filteredAnswers;
};
