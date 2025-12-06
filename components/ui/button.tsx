import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const buttonVariants = cva(
  'flex flex-row items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-slate-900',
        destructive: 'bg-red-500',
        outline: 'border border-slate-200 bg-transparent',
        secondary: 'bg-slate-100',
        ghost: 'bg-transparent',
        link: 'bg-transparent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva('text-sm font-semibold', {
  variants: {
    variant: {
      default: 'text-slate-50',
      destructive: 'text-slate-50',
      outline: 'text-slate-900',
      secondary: 'text-slate-900',
      ghost: 'text-slate-900',
      link: 'text-slate-900 underline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  label: string;
}

function Button({ label, variant, size, className, ...props }: ButtonProps) {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      <Text className={cn(buttonTextVariants({ variant }))}>{label}</Text>
    </Pressable>
  );
}

export { Button, buttonVariants, buttonTextVariants };
