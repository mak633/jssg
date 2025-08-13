import { useFormContext } from 'react-hook-form';

import { Button } from '@shared/components/primitives/button';
import { useStepper } from '@shared/components/ui/stepper/use-stepper';
import { Question, Section } from '@shared/types/quiz';

import { QuizQuestion } from './quiz-question';

type QuizSectionProps = {
  section: Section;
  questions: Record<string, Question>;
};

export const QuizSection = ({ section, questions }: QuizSectionProps) => {
  const { prevStep, nextStep, isFirstStep } = useStepper();
  const form = useFormContext();

  if (!section || !questions) {
    return null;
  }

  const onContinue = async () => {
    const valid = await form.trigger(section.qIds);
    if (valid) {
      nextStep();
    }
  };

  return (
    <div className="mt-8 flex flex-1 flex-col gap-8">
      <h2 className="text-lg font-semibold">{section.title}</h2>
      {section.qIds.map((questionId) => (
        <QuizQuestion key={questionId} question={questions[questionId]} />
      ))}
      <div className="mt-auto text-right">
        {!isFirstStep && (
          <Button
            type="button"
            variant="outline"
            className="mr-4"
            onClick={prevStep}
          >
            Back
          </Button>
        )}
        <Button type="button" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};
