import * as React from 'react';

import { cn } from '@shared/lib/utils';

function Textarea({
  className,
  value,
  ...props
}: Omit<React.ComponentProps<'textarea'>, 'value'> & {
  value?: string | number | readonly string[] | null;
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      defaultValue={value ?? undefined}
      {...props}
    />
  );
}

export { Textarea };
