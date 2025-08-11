'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@shared/lib/utils';

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'bg-primary/20 relative h-4 w-full overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        'bg-primary absolute left-0 top-0 size-full flex-1 transition-all',
        className
      )}
      style={{ width: `${value || 0}%` }}
      {...props}
    />
  );
}

export { Progress, ProgressIndicator };
