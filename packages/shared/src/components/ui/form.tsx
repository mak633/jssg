import { FormItem, FormLabel, FormControl, FormMessage, FormField, FormDescription } from "../primitives/form"
import { useFormContext } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "../primitives/radio-group"
import { Label } from "../primitives/label"
import { Input } from "../primitives/input"
import { NumberInput } from "../primitives/number-input"
import { Textarea } from "../primitives/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "../primitives/popover"
import { Calendar } from "../primitives/calendar"
import { cn, convertLocalToUTCDate, convertUTCToLocalDate, formatDate } from "@shared/lib/utils"
import { Button } from "../primitives/button"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { Checkbox } from "../primitives/checkbox"

type BooleanFormProps = {
  id: string;
  title: string;
  description?: string;
  positive: string;
  negative: string;
}
export const BooleanForm = ({id, title, description, positive, negative, }: BooleanFormProps) => {
    const form = useFormContext();

  return (
    <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
      <FormItem className="mb-8 flex max-w-sm flex-col">
        <FormLabel>{title}</FormLabel>
                        {description && (
                <FormDescription>
                  {description}
                </FormDescription>
        )}
        <FormControl>
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={'1'}
                id={`${id}-true`}
              />
              <Label htmlFor={`${id}-true`}>{positive}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value='0'
                id={`${id}-false`}
              />
              <Label htmlFor={`${id}-false`}>{negative}</Label>
            </div>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
        />
  )
}

type ShortStringFormProps = {
  id: string;
  title: string;
  description?: string;
}
export const ShortStringForm = ({id, title, description}: ShortStringFormProps) => {
    const form = useFormContext();

  return (
    <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
      <FormItem className="mb-8 flex max-w-sm flex-col">
        <FormLabel>{title}</FormLabel>
        {description && (
          <FormDescription>
            {description}
          </FormDescription>
        )}
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
        />
  )
}

type LongStringFormProps = {
  id: string;
  title: string;
  description?: string;
}
export const LongStringForm = ({id, title, description}: LongStringFormProps) => {
    const form = useFormContext();

  return (
    <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
      <FormItem className="mb-8 flex max-w-sm flex-col">
        <FormLabel>{title}</FormLabel>
        {description && (
          <FormDescription>
            {description}
          </FormDescription>
        )}
        <FormControl>
          <Textarea {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
        />
  )
}

type NumberFormProps = {
  id: string;
  title: string;
  description?: string;
}
export const NumberForm = ({id, title, description}: NumberFormProps) => {
    const form = useFormContext();

  return (
    <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
      <FormItem className="mb-8 flex max-w-sm flex-col">
        <FormLabel>{title}</FormLabel>
        {description && (
          <FormDescription>
            {description}
          </FormDescription>
        )}
        <FormControl>
          <NumberInput {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
        />
  )
}

type DateFormProps = {
  id: string;
  title: string;
  description?: string;
  placeholder?: string;
}
export const DateForm = ({id, title, description, placeholder}: DateFormProps) => {
  const form = useFormContext();
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  return (
        <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
      <FormItem className="mb-8 flex max-w-sm flex-col">
        <FormLabel>{title}</FormLabel>
        {description && (
          <FormDescription>
            {description}
          </FormDescription>
        )}
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              'pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground',
            )}
          >
            {field.value ? (
              formatDate(field.value)
            ) : (
              <span>{placeholder ?? 'Pick a date'}</span>
            )}
            <CalendarIcon className="ml-auto size-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={convertUTCToLocalDate(field.value)}
          onSelect={(v) => {
            field.onChange(convertLocalToUTCDate(v));
            setCalendarOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
       <FormMessage />
      </FormItem>
    )}
        />)
}

type OneChoiceFormProps = {
  id: string;
  title: string;
  description?: string;
  options: { value: string; label: string }[];
}
export const OneChoiceForm = ({id, title, description, options}: OneChoiceFormProps) => {
    const form = useFormContext();

  return (
    <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
      <FormItem className="mb-8 flex max-w-sm flex-col">
        <FormLabel>{title}</FormLabel>
        {description && (
          <FormDescription>
            {description}
          </FormDescription>
        )}
        <FormControl>
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
          >
             {options.map((option) => (
              <div className="flex items-center space-x-2" key={option.value}>
                <RadioGroupItem
                  value={option.value}
                  id={`${id}-${option.value}`}
                />
                <Label htmlFor={`${id}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
        />
  )
}

type MultipleChoiceFormProps = {
  id: string;
  title: string;
  description?: string;
  options: { value: string; label: string }[];
}
export const MultipleChoiceForm = ({id, title, description, options}: MultipleChoiceFormProps) => {
    const form = useFormContext();

  return (
   <FormField
          control={form.control}
          name={id}
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">{title}</FormLabel>
                {description && (
                  <FormDescription>
                    {description}
                  </FormDescription>
                )}
              </div>
              {options.map((item) => (
                <FormField
                  key={item.value}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.value}
                        className="flex flex-row items-center gap-2"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (v: string) => v !== item.value
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
  )
}