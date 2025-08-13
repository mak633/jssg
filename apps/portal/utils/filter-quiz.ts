import { Condition, Question } from '@shared/types/quiz';

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
  answers: Record<string, unknown>
) => {
  return qList.filter((qId) => {
    const requiredWhen = allQuestions[qId].requiredWhen;
    if (!requiredWhen) return true;
    const parentId = allQuestions[requiredWhen.qId]?.id;
    const parentAnswer = answers[parentId];

    return !hideQuestion(requiredWhen, parentAnswer);
  });
};

export const filterAnswersBasedOnQuestion = (
  answers: Record<string, unknown>,
  allQuestions: Record<string, Question>
) => {
  const filteredAnswers: Record<string, unknown> = {};

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
