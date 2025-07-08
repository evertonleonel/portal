import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const tabsTriggerVariants = cva('', {
  variants: {
    variant: {
      default: 'data-[state=active]:bg-primary',
      ghost: `lg:text-base
 data-[state=active]:shadow-none
  relative 
  text-muted-foreground 
  font-medium
  rounded-none 
  data-[state=active]:text-primary 
  data-[state=active]:after:content-[''] 
  data-[state=active]:after:absolute 
  data-[state=active]:after:bottom-[-2px]
  data-[state=active]:after:left-0 
  data-[state=active]:after:right-0 
  data-[state=active]:after:h-[2px] 
  data-[state=active]:after:bg-primary 
  data-[state=active]:after:rounded-none 
  data-[state=active]:after:z-10
`,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const tabsListVariants = cva('', {
  variants: {
    variant: {
      default: '',
      ghost: 'bg-background muted-foreground rounded-none  py-0 gap-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-tabs muted-foreground rounded-4xl inline-flex w-fit items-center justify-center gap-4 px-[21.5px] py-[9.5px]',
        tabsListVariants({ variant, className })
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "rounded-4xl text-normal focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-primary dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap border border-transparent px-4 py-1.5 text-sm font-medium transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-white data-[state=active]:shadow-sm dark:data-[state=active]:text-white [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        tabsTriggerVariants({ variant, className })
      )}
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
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
