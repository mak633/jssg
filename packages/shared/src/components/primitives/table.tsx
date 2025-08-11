'use client';

import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
} from '@radix-ui/react-popover';
import { AlertTriangle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@shared/lib/utils';

import { Button } from './button';
import { useFormField } from './form';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  );
}

type TableBulkUpdateConfigProps = {
  label: string;
  actionName: string;
  buttonLabel: string;
  placeholder?: string;
  isDeleteAction?: boolean;
  isHidden?: boolean;
  icon?: React.ComponentType<{ size?: string | number; className?: string }>;
  isUnlockAction?: boolean;
};

type TableBulkUpdateProps = {
  selected: number;
  total: number;
  entityName: string;
  unselectedError?: boolean;
  onCancel: () => void;
  onApply: () => void;
} & TableBulkUpdateConfigProps &
  React.PropsWithChildren;

function TableBulkUpdate({
  actionName,
  entityName,
  buttonLabel,
  selected,
  total,
  unselectedError,
  isDeleteAction,
  onCancel,
  onApply,
  children,
}: TableBulkUpdateProps) {
  return (
    <div
      className={cn(
        unselectedError ? 'items-center' : 'items-end',
        'z-1 sticky bottom-0 flex justify-between rounded-md bg-slate-900 px-6 py-4'
      )}
    >
      <div className="self-center">
        <h4 className="font-semibold text-slate-50">{actionName}</h4>
        {selected ? (
          <p className="text-sm text-slate-300">
            {selected} of {total} {entityName} selected
          </p>
        ) : (
          <p
            className={cn(
              unselectedError ? 'text-destructive' : 'text-slate-300',
              'text-sm'
            )}
          >
            Please select products to perform this action
          </p>
        )}
      </div>
      <div>{children}</div>
      <div className="flex">
        <Button type="button" onClick={onCancel} className="mr-2 bg-slate-600">
          Cancel
        </Button>
        <Button
          type="button"
          variant={isDeleteAction ? 'destructive' : 'blue'}
          onClick={onApply}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}

function TableCellError() {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : '';
  const [open, setOpen] = React.useState(false);

  if (!error) {
    return null;
  }

  const isRequired = body.toLowerCase().includes('please fill');

  return (
    <Popover open={open}>
      <PopoverTrigger
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="mt-auto h-8 w-full"
      >
        <div
          id={formMessageId}
          className="flex h-8 w-full items-center justify-center bg-red-200 py-2 text-red-600"
        >
          <AlertTriangle className="me-1" size={15} />
          {isRequired ? 'Required' : 'Invalid'}
        </div>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className="text-sm font-normal">
          <PopoverArrow />
          <div className="rounded bg-slate-900 p-2 text-white">{body}</div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableBulkUpdate,
  TableCellError,
};
export type { TableBulkUpdateConfigProps };
