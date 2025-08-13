'use client';

import * as React from 'react';

import { useMediaQuery } from '@shared/hooks/use-media-query';
import { cn } from '@shared/lib/utils';

import { StepperProvider } from './context';
import { Step } from './step';
import { StepWrapper } from './step-wrapper';
import { useStepper } from './use-stepper';

import type { StepItem, StepProps, StepperProps } from './types';

const VARIABLE_SIZES = {
  sm: '36px',
  md: '40px',
  lg: '44px',
};

interface CustomStepperProps extends StepperProps {
  topBarWidth?: string;
}

const Stepper = React.forwardRef<HTMLDivElement, CustomStepperProps>(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const {
      className,
      children,
      orientation: orientationProp = 'horizontal',
      state,
      responsive = true,
      checkIcon,
      errorIcon,
      onClickStep,
      mobileBreakpoint,
      expandVerticalSteps = false,
      initialStep = 0,
      size = 'md',
      steps,
      variant,
      styles,
      variables,
      scrollTracking = false,
      topBarWidth,
      ...rest
    } = props;

    const childArr = React.Children.toArray(children);

    const items = [] as React.ReactElement[];

    const footer = childArr.map((child) => {
      if (!React.isValidElement(child)) {
        throw new Error('Stepper children must be valid React elements.');
      }
      if (child.type === Step) {
        items.push(child);

        return null;
      }

      return child;
    });

    const stepCount = items.length;

    const isMobile = useMediaQuery(
      `(max-width: ${mobileBreakpoint || '768px'})`
    );

    const clickable = !!onClickStep;

    const orientation = isMobile && responsive ? 'vertical' : orientationProp;

    const isVertical = orientation === 'vertical';

    return (
      <StepperProvider
        value={{
          initialStep,
          orientation,
          state,
          size,
          responsive,
          checkIcon,
          errorIcon,
          onClickStep,
          clickable,
          stepCount,
          isVertical,
          variant: variant || 'circle',
          expandVerticalSteps,
          steps,
          scrollTracking,
          styles,
        }}
      >
        <div
          ref={ref}
          className={cn(
            'stepper__main-container',
            'flex flex-wrap',
            topBarWidth ? topBarWidth : 'w-full',
            stepCount === 1 ? 'justify-end' : 'justify-between',
            orientation === 'vertical' ? 'flex-col' : 'flex-row',
            variant === 'line' && orientation === 'horizontal' && 'gap-4',
            className,
            styles?.['main-container']
          )}
          style={
            {
              '--step-icon-size':
                variables?.['--step-icon-size'] ||
                `${VARIABLE_SIZES[size || 'md']}`,
              '--step-gap': variables?.['--step-gap'] || '8px',
            } as React.CSSProperties
          }
          {...rest}
        >
          <VerticalContent>{items}</VerticalContent>
        </div>
        {orientation === 'horizontal' && (
          <HorizontalContent>{items}</HorizontalContent>
        )}
        {footer}
      </StepperProvider>
    );
  }
);

Stepper.displayName = 'Stepper';

const VerticalContent = ({ children }: { children: React.ReactNode }) => {
  const { activeStep } = useStepper();

  const childArr = React.Children.toArray(children);
  const stepCount = childArr.length;

  return (
    <>
      {React.Children.map(children, (child, i) => {
        const isCompletedStep =
          (React.isValidElement(child) &&
            (child as unknown as React.JSX.Element).props.isCompletedStep) ??
          i < activeStep;
        const isLastStep = i === stepCount - 1;
        const isCurrentStep = i === activeStep;

        const stepProps = {
          index: i,
          isCompletedStep,
          isCurrentStep,
          isLastStep,
        };

        if (React.isValidElement(child)) {
          return React.cloneElement(child, stepProps);
        }

        return null;
      })}
    </>
  );
};

const HorizontalContent = ({ children }: { children: React.ReactNode }) => {
  const { activeStep } = useStepper();
  const childArr = React.Children.toArray(children);

  if (activeStep > childArr.length) {
    return null;
  }

  return (
    <>
      {React.Children.map(childArr[activeStep], (node) => {
        if (!React.isValidElement(node)) {
          return null;
        }

        return React.Children.map(
          (node as unknown as React.JSX.Element).props.children,
          (childNode) => childNode
        );
      })}
    </>
  );
};

export { Stepper, Step, useStepper, StepWrapper };
export type { StepProps, StepperProps, StepItem };
