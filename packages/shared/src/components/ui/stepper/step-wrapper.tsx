import { forwardRef, PropsWithChildren } from 'react';

import { Button } from '@shared/components/primitives/button';

type StepWrapperProps = {
  title: string;
  onCancel: () => void;
} & PropsWithChildren;

const StepWrapper = forwardRef<HTMLDivElement, StepWrapperProps>(
  ({ title, onCancel, children }, ref) => (
    <div
      ref={ref}
      className="mt-5 grid grid-cols-2 gap-5 xl:grid-cols-[auto_minmax(0,1fr)_auto]"
    >
      <h1 className="mt-1 text-2xl font-bold tracking-tight">{title}</h1>
      <div className="order-2 col-span-2 xl:order-none xl:col-span-1">
        {children}
      </div>
      <Button
        variant="ghost"
        className="lg mt-1 place-self-end xl:place-self-auto"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  )
);

StepWrapper.displayName = 'StepWrapper';

export { StepWrapper };
