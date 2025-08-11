'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormProps } from 'react-hook-form';
import { type ZodSchema, type TypeOf } from 'zod';

type Props<T extends ZodSchema> = {
  schema: T;
} & Omit<UseFormProps<TypeOf<T>>, 'resolver'>;

export function useZodForm<T extends ZodSchema>({
  schema,
  ...props
}: Props<T>) {
  const form = useForm({
    ...props,
    resolver: zodResolver(schema),
  });

  return form;
}
