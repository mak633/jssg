import { useFormContext } from "react-hook-form";

import { Button } from "@shared/components/primitives/button";
import { Question, Section } from "@shared/types/quiz";

import { QuizQuestion } from "./quiz-question";


type QuizSectionProps = {
  section: Section;
  questions: Record<string, Question>;
  next: () => void;
  prev: () => void;
}

export const QuizSection = ({section, questions, next, prev}: QuizSectionProps) => {
  const form = useFormContext();

  if (!section || !questions) {
    return null;
  }

  const onContinue = () => {
    form.trigger();
    if(!section.qIds.some(id => form.formState.errors[id])) {
      next();
    }
  };

  return (
    <div>
      <h2>{section.title}</h2>
      {section.qIds.map((questionId) => (
        <QuizQuestion key={questionId} question={questions[questionId]} />
      ))}
      <div>
        <Button type="button" onClick={prev}>Back</Button>
        <Button type="button" onClick={onContinue}>Continue</Button>
      </div>
    </div>
  );
};
