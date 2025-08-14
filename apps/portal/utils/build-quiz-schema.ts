import { z } from 'zod';

import { Quiz, QuestionType, Condition, Answer } from '@shared/types/quiz';

function evaluateCondition(
  condition: Condition,
  data: Record<string, Answer>
): boolean {
  const value = data[condition.qId];

  switch (condition.op) {
    case 'eq':
      return value === condition.value;
    case 'neq':
      return value !== condition.value;
    case 'isTruthy':
      return Boolean(value);
    case 'isFalsy':
      return !value;
    default:
      return false;
  }
}

export function buildQuizSchema(quiz: Quiz): z.ZodType<Record<string, Answer>> {
  return z
    .object({})
    .catchall(z.any())
    .superRefine((data, ctx) => {
      for (const question of Object.values(quiz.questions)) {
        const value = data[question.id];
        let isRequired = question.required || false;

        if (question.requiredWhen) {
          const conditionMet = evaluateCondition(question.requiredWhen, data);
          isRequired = conditionMet;
        }

        switch (question.type) {
          case QuestionType.OneChoice: {
            if (
              isRequired &&
              (typeof value !== 'string' || value.length === 0)
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `This field is required`,
                path: [question.id],
              });
            }
            break;
          }

          case QuestionType.ShortString:
          case QuestionType.LongString: {
            if (
              isRequired &&
              (typeof value !== 'string' || value.length === 0)
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `This field is required`,
                path: [question.id],
              });
            } else if (
              typeof value === 'string' &&
              value.length > 0 &&
              'validation' in question
            ) {
              if (
                question.validation?.minLength &&
                value.length < question.validation.minLength
              ) {
                ctx.addIssue({
                  code: z.ZodIssueCode.too_small,
                  minimum: question.validation.minLength,
                  type: 'string',
                  inclusive: true,
                  message: `Minimum ${question.validation.minLength} characters required`,
                  path: [question.id],
                });
              }
              if (
                question.validation?.maxLength &&
                value.length > question.validation.maxLength
              ) {
                ctx.addIssue({
                  code: z.ZodIssueCode.too_big,
                  maximum: question.validation.maxLength,
                  type: 'string',
                  inclusive: true,
                  message: `Maximum ${question.validation.maxLength} characters allowed`,
                  path: [question.id],
                });
              }
              if (
                question.type === QuestionType.ShortString &&
                question.validation?.pattern &&
                !new RegExp(question.validation.pattern).test(value)
              ) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Invalid format',
                  path: [question.id],
                });
              }
            }
            break;
          }

          case QuestionType.MultipleChoice: {
            if (isRequired && (!Array.isArray(value) || value.length === 0)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `This field is required`,
                path: [question.id],
              });
            } else if (
              Array.isArray(value) &&
              value.length > 0 &&
              'validation' in question
            ) {
              if (
                question.validation?.minSelections &&
                value.length < question.validation.minSelections
              ) {
                ctx.addIssue({
                  code: z.ZodIssueCode.too_small,
                  minimum: question.validation.minSelections,
                  type: 'array',
                  inclusive: true,
                  message: `Please select at least ${question.validation.minSelections} options`,
                  path: [question.id],
                });
              }
              if (
                question.validation?.maxSelections &&
                value.length > question.validation.maxSelections
              ) {
                ctx.addIssue({
                  code: z.ZodIssueCode.too_big,
                  maximum: question.validation.maxSelections,
                  type: 'array',
                  inclusive: true,
                  message: `Please select no more than ${question.validation.maxSelections} options`,
                  path: [question.id],
                });
              }
            }
            break;
          }

          case QuestionType.Boolean: {
            if (isRequired && typeof value !== 'boolean') {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `This field is required`,
                path: [question.id],
              });
            }
            break;
          }

          case QuestionType.Number: {
            if (isRequired && (typeof value !== 'number' || isNaN(value))) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `This field is required`,
                path: [question.id],
              });
            } else if (
              typeof value === 'number' &&
              !isNaN(value) &&
              'validation' in question
            ) {
              if (
                question.validation?.min !== undefined &&
                value < question.validation.min
              ) {
                ctx.addIssue({
                  code: z.ZodIssueCode.too_small,
                  minimum: question.validation.min,
                  type: 'number',
                  inclusive: true,
                  message: `Value must be at least ${question.validation.min}`,
                  path: [question.id],
                });
              }
              if (
                question.validation?.max !== undefined &&
                value > question.validation.max
              ) {
                ctx.addIssue({
                  code: z.ZodIssueCode.too_big,
                  maximum: question.validation.max,
                  type: 'number',
                  inclusive: true,
                  message: `Value must be at most ${question.validation.max}`,
                  path: [question.id],
                });
              }
            }
            break;
          }

          case QuestionType.Date: {
            if (
              isRequired &&
              (typeof value !== 'string' || value.length === 0)
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `This field is required`,
                path: [question.id],
              });
            } else if (
              typeof value === 'string' &&
              value.length > 0 &&
              'validation' in question
            ) {
              const date = new Date(value);
              if (
                question.validation?.min &&
                date < new Date(question.validation.min)
              ) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `Date must be after ${question.validation.min}`,
                  path: [question.id],
                });
              }
              if (
                question.validation?.max &&
                date > new Date(question.validation.max)
              ) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `Date must be before ${question.validation.max}`,
                  path: [question.id],
                });
              }
            }
            break;
          }
        }
      }
    });
}
