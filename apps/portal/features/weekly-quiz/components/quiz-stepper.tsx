import { JSX, useCallback, useMemo } from "react";
import { z } from "zod";

import { Form } from "@shared/components/primitives/form";
import { defineStepper } from "@shared/components/primitives/stepper";
import { useZodForm } from '@shared/hooks/use-zod-form';
import { Quiz } from "@shared/types/quiz";

import { buildQuizSchema } from "@/utils/build-quiz-schema";

import { QuizSection } from "./quiz-section";

type QuizStepperProps = {
  quiz: Quiz;
}

export const QuizStepper = ({quiz}: QuizStepperProps) => {
  const schema = buildQuizSchema(quiz);
  type Inputs = z.infer<typeof schema>;

  const form = useZodForm({
    schema,
  });

  const { Stepper, useStepper } = defineStepper(...Object.keys(quiz.sections).map((id) => ({
    id,
    title: quiz.sections[id].title,
  })));

  const {prev, next} = useStepper();

  const handlePrev = useCallback(() => {
    prev();
  }, [prev]);

  const handleNext = useCallback(() => {
    next();
  }, [next]);

  const steps = useMemo(() => {
    return Object.keys(quiz.sections).reduce((acc, id) => {
        acc[id] = (step) => <QuizSection key={step.id} section={quiz.sections[step.id]} questions={quiz.questions} prev={handlePrev} next={handleNext} />;

        return acc;
    }, {} as Record<string, (step: { id: string }) => JSX.Element>);
  }, [handleNext, handlePrev, quiz.questions, quiz.sections]);

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <Stepper.Provider
      className="space-y-4"
    >
      {({ methods }) => (
              <>
                <Stepper.Navigation>
                  {methods.all.map((step) => (
                    <Stepper.Step
                      key={step.id}
                      of={step.id}
                    >
                      <Stepper.Title>{step.title}</Stepper.Title>
                    </Stepper.Step>
                  ))}
                </Stepper.Navigation>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {methods.switch(steps)}
                  </form>
                </Form>
              </>
            )}
    </Stepper.Provider>
  );
};
