'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@shared/lib/utils';

type TabContextProps = {
  variant: VariantProps<typeof tabsListVariants>['variant'];
};

const TabContext = React.createContext<TabContextProps | null>(null);

function useTab() {
  const context = React.useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider.');
  }

  return context;
}

const defaultVariant = 'default';

const tabsListVariants = cva('', {
  variants: {
    variant: {
      default:
        'bg-muted inline-flex items-center justify-center rounded-lg border border-slate-300 p-1',
      ghost:
        'flex items-center space-x-8 border-b border-border bg-background p-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const tabsTriggerVariants = cva('', {
  variants: {
    variant: {
      default:
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-bold transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm lg:px-4 lg:py-3 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      ghost:
        'inline-flex items-center gap-2 px-0 py-3 text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-b-2 border-transparent text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> &
  VariantProps<typeof tabsListVariants>) {
  const { variant, ...rest } = props;

  return (
    <TabContext.Provider value={{ variant: variant || defaultVariant }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn('flex flex-col gap-2', className)}
        {...rest}
      />
    </TabContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { variant } = useTab();

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant, className }))}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { variant } = useTab();

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, className }))}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
