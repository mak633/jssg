import { TFunction } from 'i18next';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn, formatDate } from '@shared/lib/utils';

import { Button } from '../primitives/button';
import { Calendar } from '../primitives/calendar';
import { Checkbox } from '../primitives/checkbox';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  FormDescription,
} from '../primitives/form';
import { Input } from '../primitives/input';
import { Label } from '../primitives/label';
import { NumberInput } from '../primitives/number-input';
import { Popover, PopoverContent, PopoverTrigger } from '../primitives/popover';
import { RadioGroup, RadioGroupItem } from '../primitives/radio-group';
import { Textarea } from '../primitives/textarea';

type BooleanFormProps = {
  id: string;
  title: string;
  description?: string;
  t: TFunction<'translation', string>;
  tPrefix?: string;
};
export const BooleanForm = ({
  id,
  title,
  description,
  t,
  tPrefix,
}: BooleanFormProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-4">
          <FormLabel>{t(`${tPrefix}.${title}`)}</FormLabel>
          {description && (
            <FormDescription>{t(`${tPrefix}.${description}`)}</FormDescription>
          )}
          <FormControl>
            <RadioGroup
              value={field.value === null ? null : field.value ? '1' : '0'}
              onValueChange={(v) => field.onChange(v === '1')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id={`${id}-true`} />
                <Label htmlFor={`${id}-true`}>{t('common.yes')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id={`${id}-false`} />
                <Label htmlFor={`${id}-false`}>{t('common.no')}</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type ShortStringFormProps = {
  id: string;
  title: string;
  description?: string;
  t: TFunction<'translation', string>;
  tPrefix?: string;
};
export const ShortStringForm = ({
  id,
  title,
  description,
  t,
  tPrefix,
}: ShortStringFormProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{t(`${tPrefix}.${title}`)}</FormLabel>
          {description && (
            <FormDescription>{t(`${tPrefix}.${description}`)}</FormDescription>
          )}
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type LongStringFormProps = {
  id: string;
  title: string;
  description?: string;
  t: TFunction<'translation', string>;
  tPrefix?: string;
};
export const LongStringForm = ({
  id,
  title,
  description,
  t,
  tPrefix,
}: LongStringFormProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{t(`${tPrefix}.${title}`)}</FormLabel>
          {description && (
            <FormDescription>{t(`${tPrefix}.${description}`)}</FormDescription>
          )}
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type NumberFormProps = {
  id: string;
  title: string;
  description?: string;
  t: TFunction<'translation', string>;
  tPrefix?: string;
};
export const NumberForm = ({
  id,
  title,
  description,
  t,
  tPrefix,
}: NumberFormProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{t(`${tPrefix}.${title}`)}</FormLabel>
          {description && (
            <FormDescription>{t(`${tPrefix}.${description}`)}</FormDescription>
          )}
          <FormControl>
            <NumberInput {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type DateFormProps = {
  id: string;
  title: string;
  description?: string;
  placeholder?: string;
  t: TFunction<'translation', string>;
  tPrefix?: string;
};
export const DateForm = ({
  id,
  title,
  description,
  placeholder,
  t,
  tPrefix,
}: DateFormProps) => {
  const form = useFormContext();
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{t(`${tPrefix}.${title}`)}</FormLabel>
          {description && (
            <FormDescription>{t(`${tPrefix}.${description}`)}</FormDescription>
          )}
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    'pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    formatDate(new Date(field.value))
                  ) : (
                    <span>
                      {placeholder ? t(`${tPrefix}.${placeholder}`) : ''}
                    </span>
                  )}
                  <CalendarIcon className="ml-auto size-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(field.value)}
                onSelect={(v) => {
                  field.onChange(String(v));
                  setCalendarOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type OneChoiceFormProps = {
  id: string;
  title: string;
  description?: string;
  options: { value: string; label: string }[];
  t: TFunction<'translation', string>;
  tPrefix?: string;
};
export const OneChoiceForm = ({
  id,
  title,
  description,
  options,
  t,
  tPrefix,
}: OneChoiceFormProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{t(`${tPrefix}.${title}`)}</FormLabel>
          {description && (
            <FormDescription>{t(`${tPrefix}.${description}`)}</FormDescription>
          )}
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="mt-2"
            >
              {options.map((option) => (
                <div className="flex items-center space-x-2" key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={`${id}-${option.value}`}
                  />
                  <Label htmlFor={`${id}-${option.value}`}>
                    {t(`${tPrefix}.${option.label}`)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type MultipleChoiceFormProps = {
  id: string;
  title: string;
  description?: string;
  options: { value: string; label: string }[];
  t: TFunction<'translation', string>;
  tPrefix?: string;
};
export const MultipleChoiceForm = ({
  id,
  title,
  description,
  options,
  t,
  tPrefix,
}: MultipleChoiceFormProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={id}
      render={() => (
        <FormItem>
          <div>
            <FormLabel className="text-base">
              {t(`${tPrefix}.${title}`)}
            </FormLabel>
            {description && (
              <FormDescription>
                {t(`${tPrefix}.${description}`)}
              </FormDescription>
            )}
          </div>
          {options.map((item) => (
            <FormField
              key={item.value}
              control={form.control}
              name={id}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.value}
                    className="flex flex-row items-center gap-2"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.value) || null}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([
                                ...(field.value ?? []),
                                item.value,
                              ])
                            : field.onChange(
                                field.value?.filter(
                                  (v: string) => v !== item.value
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {t(`${tPrefix}.${item.label}`)}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
