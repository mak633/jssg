import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { Form } from '@shared/components/primitives/form';
import { Stepper } from '@shared/components/ui/stepper';
import { Step } from '@shared/components/ui/stepper/step';
import { useZodForm } from '@shared/hooks/use-zod-form';
import { Quiz, QuizAnswers } from '@shared/types/quiz';

import { buildDefaultValues } from '@/utils/build-quiz-default-values';
import { buildQuizSchema } from '@/utils/build-quiz-schema';
import { filterAnswersBasedOnQuestion } from '@/utils/filter-quiz';
import { TranslationKeys } from '@/utils/translation-keys';

import { QuizSection } from './components/quiz-section';
import { QuizSummary } from './quiz-summary/quiz-summary';

type QuizStepperProps = {
  quiz: Quiz;
  onSubmit: (data: QuizAnswers) => void;
};

export const QuizStepper = ({ quiz, onSubmit }: QuizStepperProps) => {
  const {t} = useTranslation()
  const schema = useMemo(() => buildQuizSchema(quiz), [quiz]);
  type Inputs = z.infer<typeof schema>;

  const form = useZodForm({
    schema,
    defaultValues: buildDefaultValues(quiz),
    mode: 'onTouched',
  });

  const steps = useMemo(() => {
    return [
      ...Object.values(quiz.sections).map(({ title }) => ({ label: title })),
      { label: 'Summary' },
    ];
  }, [quiz.sections]);

  const handleSubmit = (data: Inputs) => {
    onSubmit(filterAnswersBasedOnQuestion(data, quiz.questions));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-1 flex-col"
      >
        <Stepper initialStep={0} steps={steps}>
          {Object.keys(quiz.sections).map((sectionId) => (
            <Step key={sectionId} label={t(`${quiz.id}.${quiz.sections[sectionId].title}`)}>
              <QuizSection
                key={sectionId}
                quizId={quiz.id}
                section={quiz.sections[sectionId]}
                questions={quiz.questions}
              />
            </Step>
          ))}
          <Step label={t(TranslationKeys.quiz.summary)}>
            <QuizSummary quiz={quiz} />
          </Step>
        </Stepper>
      </form>
    </Form>
  );
};
