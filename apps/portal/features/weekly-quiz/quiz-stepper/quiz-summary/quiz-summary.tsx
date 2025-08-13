import { Button } from '@shared/components/primitives/button';
import { FormSubmitButton } from '@shared/components/primitives/form';
import { useStepper } from '@shared/components/ui/stepper';
import { Quiz } from '@shared/types/quiz';

import { QuizSummarySection } from './components/quiz-summary-section';

type QuizSummaryProps = {
  quiz: Quiz;
};
export const QuizSummary = ({ quiz }: QuizSummaryProps) => {
  const { prevStep } = useStepper();

  return (
    <div className="mt-8 flex flex-1 flex-col gap-8">
      <h2 className="text-lg font-semibold">
        Please review information before submitting
      </h2>
      {Object.keys(quiz.sections).map((sectionId, id) => (
        <QuizSummarySection
          key={sectionId}
          quiz={quiz}
          sectionId={sectionId}
          id={id}
        />
      ))}
      <div className="mt-auto text-right">
        <Button
          type="button"
          variant="outline"
          className="mr-4"
          onClick={prevStep}
        >
          Back
        </Button>
        <FormSubmitButton>Submit</FormSubmitButton>
      </div>
    </div>
  );
};
