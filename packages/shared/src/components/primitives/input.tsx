import * as React from 'react';

import { cn } from '@shared/lib/utils';

export interface InputProps {
  placeholderIcon?: React.JSX.Element;
}

function Input({
  className,
  type,
  placeholderIcon,
  ...props
}: React.ComponentProps<'input'> & InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        !props.value && placeholderIcon ? 'pl-12' : '',
        className
      )}
      {...props}
    />
  );
}

export { Input };
