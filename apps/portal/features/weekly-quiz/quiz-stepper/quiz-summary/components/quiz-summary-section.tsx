import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { SquarePen } from '@shared/components/icons';
import { Button } from '@shared/components/primitives/button';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@shared/components/primitives/table';
import { useStepper } from '@shared/components/ui/stepper/use-stepper';
import { Quiz } from '@shared/types/quiz';

import { answerModifier } from '@/utils/answer-modifier';
import { filterQuestionsBasedOnAnswer } from '@/utils/filter-quiz';

type QuizSummarySectionProps = {
  quiz: Quiz;
  sectionId: string;
  id: number;
};
export const QuizSummarySection = ({
  quiz,
  sectionId,
  id,
}: QuizSummarySectionProps) => {
  const { getValues } = useFormContext();
  const { setStep } = useStepper();

  const filteredQuestions = useMemo(() => {
    return filterQuestionsBasedOnAnswer(
      quiz.sections[sectionId].qIds,
      quiz.questions,
      getValues()
    );
  }, [getValues, quiz.questions, quiz.sections, sectionId]);

  return (
    <div>
      <div className="mb-3 flex flex-row items-center">
        <h3 className="mr-6 text-lg font-medium">
          {quiz.sections[sectionId].title}
        </h3>
        <Button
          onClick={() => {
            setStep(id);
          }}
          variant="ghost"
          className="h-auto p-2"
        >
          <SquarePen className="mr-2 size-4" />
          Edit
        </Button>
      </div>
      <Table className="mb-8 max-w-xl table-fixed border-t-4">
        <TableBody>
          {filteredQuestions.map((questionId) => (
            <TableRow key={questionId}>
              <TableCell className="w-50 border">
                {quiz.questions[questionId].title}
              </TableCell>
              <TableCell className="w-50 border">
                {answerModifier(
                  getValues(questionId),
                  quiz.questions[questionId]
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
