import { useTranslation } from 'react-i18next';

import { Button } from '@shared/components/primitives/button';
import { FormSubmitButton } from '@shared/components/primitives/form';
import { useStepper } from '@shared/components/ui/stepper';
import { Quiz } from '@shared/types/quiz';

import { TranslationKeys } from '@/utils/translation-keys';

import { QuizSummarySection } from './components/quiz-summary-section';

type QuizSummaryProps = {
  quiz: Quiz;
};
export const QuizSummary = ({ quiz }: QuizSummaryProps) => {
  const { t } = useTranslation();
  const { prevStep } = useStepper();

  return (
    <div className="mt-8 flex flex-1 flex-col gap-8">
      <h2 className="text-lg font-semibold">
        {t(TranslationKeys.quiz.review_info)}
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
          {t(TranslationKeys.common.back)}
        </Button>
        <FormSubmitButton>{t(TranslationKeys.common.submit)}</FormSubmitButton>
      </div>
    </div>
  );
};
