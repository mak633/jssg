import { useFormContext } from "react-hook-form"

import { BooleanForm, DateForm, LongStringForm, MultipleChoiceForm, NumberForm, OneChoiceForm, ShortStringForm } from "@shared/components/ui/form";
import { Condition, Question, QuestionType } from "@shared/types/quiz";

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

const hideQuestion = (condition: Condition, value?: number | string | boolean) => {
  switch (condition.op) {
    case 'isTruthy':
    case 'isFalsy':
      return value;
    case 'eq':
      return value !== condition.value;
    case 'neq':
      return value === condition.value;
    default:
      return false;
  }
};

type QuizQuestionPros = {
  question: Question;
}
export const QuizQuestion = ({ question }: QuizQuestionPros) => {
  const {watch} = useFormContext();
  const dependsOn = question.requiredWhen && watch(question.requiredWhen.qId);
  const hidden = question.requiredWhen && hideQuestion(question.requiredWhen, dependsOn);

  if(hidden) {
    return null;
  }
  
  return renderQuestion(question);
};
