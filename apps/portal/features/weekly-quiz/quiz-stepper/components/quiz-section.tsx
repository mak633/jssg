import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@shared/components/primitives/button';
import { useStepper } from '@shared/components/ui/stepper/use-stepper';
import { Question, Section } from '@shared/types/quiz';

import { TranslationKeys } from '@/utils/translation-keys';

import { QuizQuestion } from './quiz-question';

type QuizSectionProps = {
  quizId: string
  section: Section;
  questions: Record<string, Question>;
};

export const QuizSection = ({ quizId, section, questions }: QuizSectionProps) => {
  const {t} = useTranslation()
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
      <h2 className="text-lg font-semibold">{t(`${quizId}.${section.title}`)}</h2>
      {section.qIds.map((questionId) => (
        <QuizQuestion key={questionId} quizId={quizId} question={questions[questionId]} />
      ))}
      <div className="mt-auto text-right">
        {!isFirstStep && (
          <Button
            type="button"
            variant="outline"
            className="mr-4"
            onClick={prevStep}
          >
            {t(TranslationKeys.common.back)}
          </Button>
        )}
        <Button type="button" onClick={onContinue}>
          {t(TranslationKeys.common.continue)}
        </Button>
      </div>
    </div>
  );
};
