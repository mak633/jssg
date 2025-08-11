import { SquarePen } from '@shared/components/icons';
import { Button } from '@shared/components/primitives/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '@shared/components/primitives/card';
import { cn } from '@shared/lib/utils';

type StepEditCardProps = {
  title: string;
  value?: string;
  className?: string;
  onEdit?: () => void;
  testId?: string;
};

const StepEditCard = ({
  title,
  value,
  className,
  onEdit,
  testId,
}: StepEditCardProps) => (
  <Card
    className={cn('bg-secondary max-w-64 border-none shadow-none', className)}
    data-testid={`card-${testId}`}
  >
    <CardHeader className="flex flex-row justify-between space-y-0 p-4 pb-0">
      <p className="mr-4 text-current">{title}</p>
      {onEdit && (
        <Button
          variant="outline"
          type="button"
          size="icon-sm"
          onClick={onEdit}
          className="relative"
          data-testid={`button-edit-${testId}-card`}
        >
          <SquarePen className="size-4">Edit</SquarePen>
        </Button>
      )}
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <p className="font-medium">{value}</p>
    </CardContent>
  </Card>
);

export { StepEditCard };
