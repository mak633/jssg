'use client';

import * as React from 'react';

import { cn } from '@shared/lib/utils';

import { TriangleAlertIcon } from '../icons';

function ErrorMessage({
  className,
  content,
  ...props
}: React.ComponentProps<'div'> & { content?: string }) {
  if (!content) {
    return null;
  }

  return (
    <div
      className={cn(
        'text-destructive flex text-[0.8rem] font-medium',
        className
      )}
      aria-live="polite"
      {...props}
    >
      <TriangleAlertIcon className="mr-2" size={16} />
      <p>{content}</p>
    </div>
  );
}

export { ErrorMessage };
