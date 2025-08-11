'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@shared/components/primitives/button';
import { cn } from '@shared/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        month: 'space-y-4',
        months:
          'flex flex-col sm:flex-row space-y-4 sm:space-y-0 relative gap-2',
        month_caption: 'flex justify-center pt-1 relative items-center',
        month_grid: 'w-full border-collapse space-y-1',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center justify-between absolute inset-x-0',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'size-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-10'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'size-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-10'
        ),
        weeks: 'w-full border-collapse',
        weekdays: 'flex',
        weekday:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-none first:aria-selected:rounded-l-md last:aria-selected:rounded-r-md',
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20'
        ),
        range_start:
          'day-range-start !bg-accent rounded-l-md [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground',
        range_end:
          'day-range-end !bg-accent rounded-r-md [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground',
        range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        selected: cn(
          props.mode === 'range'
            ? 'bg-primary hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground'
            : '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground [&>button]:focus:bg-primary [&>button]:focus:text-primary-foreground'
        ),
        today: 'bg-accent text-accent-foreground !rounded-md',
        outside:
          'day-outside text-muted-foreground opacity-50 !aria-selected:bg-accent/50 !aria-selected:text-muted-foreground !aria-selected:opacity-30',
        disabled: 'text-muted-foreground opacity-50',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) =>
          props.orientation === 'left' ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          ),
        Button: ({ children, ...buttonProps }) => {
          let testId: string | undefined;

          if (buttonProps['aria-label'] === 'Go to the Next Month') {
            testId = 'button-date-selector-next';
          } else if (buttonProps['aria-label'] === 'Go to the Previous Month') {
            testId = 'button-date-selector-previous';
          }

          return (
            <button {...buttonProps} data-testid={testId}>
              {children}
            </button>
          );
        },
        ...props.components,
      }}
      disabled={props.disabled}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
