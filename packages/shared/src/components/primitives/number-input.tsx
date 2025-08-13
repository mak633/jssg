import * as React from 'react';

import { Input } from './input';

const FLOATING_POINT_REGEX = /^[Ee0-9+\-.]$/;

function isFloatingPointNumericCharacter(character: string) {
  return FLOATING_POINT_REGEX.test(character);
}

type InputProps = {
  onChange: (_: number) => void;
  suffix?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'>;

function NumberInput({ className, onChange, ...props }: InputProps) {
  const sanitize = React.useCallback(
    (value: string) =>
      value.split('').filter(isFloatingPointNumericCharacter).join(''),
    []
  );

  const onInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const evt = event.nativeEvent as InputEvent;
      if (evt.isComposing) return;
      const value = sanitize(event.currentTarget.value);

      if (onChange) onChange(Number(value));
    },
    [onChange, sanitize]
  );

  return (
    <Input
      type="number"
      inputMode="decimal"
      pattern="[0-9]*(.[0-9]+)?"
      autoComplete="off"
      autoCorrect="off"
      className={className}
      {...props}
      onChange={onInputChange}
    />
  );
}

export { NumberInput };
