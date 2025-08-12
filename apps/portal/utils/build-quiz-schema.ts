import { z } from "zod";

import { Condition, Question, QuestionType, Quiz } from "@shared/types/quiz";

type Answers = Record<string, unknown>;

const literalEnum = (values: string[]) =>
  values.length > 0
    ? z.enum(values as [string, ...string[]])
    : z.string();

const isIsoDateLike = (s: string) => !Number.isNaN(Date.parse(s));

const cmpIso = (a: string, b: string) =>
  Date.parse(a) - Date.parse(b);

function evalCondition(cond: Condition, answers: Answers): boolean {
  const v = answers[cond.qId];

  switch (cond.op) {
    case "isTruthy":
    case "isFalsy":
      return !v;
    case "eq":
      return v === cond.value;
    case "neq":
      return v !== cond.value;
    default:
      return false;
  }
}

function schemaForQuestion(q: Question) {
  switch (q.type) {
    case QuestionType.OneChoice: {
      const allowed = (q.options ?? [])
        .filter(o => !o.disabled)
        .map(o => o.value);
      const s = literalEnum(allowed);

      return s;
    }

    case QuestionType.MultipleChoice: {
      const allowed = (q.options ?? [])
        .filter(o => !o.disabled)
        .map(o => o.value);
      const elem = literalEnum(allowed);
      const s = z.array(elem);

      const minSel = q.validation?.minSelections ?? (q.required ? 1 : undefined);
      const maxSel = q.validation?.maxSelections;

      if (typeof minSel === "number") s.min(minSel, { message: `Select at least ${minSel}` });
      if (typeof maxSel === "number") s.max(maxSel, { message: `Select at most ${maxSel}` });

      return s;
    }

    case QuestionType.Boolean: {
      return z.boolean();
    }

    case QuestionType.Number: {
      const s = z.number({
        invalid_type_error: "Expected a number",
      });
      const { min, max } = q.validation ?? {};

      if (typeof min === "number") s.min(min);
      if (typeof max === "number") s.max(max);

      return s;
    }

    case QuestionType.ShortString: {
      const s = z.string();
      const { minLength, maxLength, pattern } = q.validation ?? {};
      if (typeof minLength === "number") s.min(minLength);
      if (typeof maxLength === "number") s.max(maxLength);
      if (pattern) {
        const re = new RegExp(pattern, "u");
        s.regex(re, { message: "Invalid format" });
      }
      
      return s;
    }

    case QuestionType.LongString: {
      const s = z.string();
      const { minLength, maxLength } = q.validation ?? {};
      if (typeof minLength === "number") s.min(minLength);
      if (typeof maxLength === "number") s.max(maxLength);

      return s;
    }

    case QuestionType.Date: {
      const s = z
        .string()
        .refine(isIsoDateLike, { message: "Invalid date/time format" });
      const { min, max } = q.validation ?? {};
      if (min) {
        s.refine(v => isIsoDateLike(v) && cmpIso(v, min) >= 0, {
          message: `Date must be on/after ${min}`,
        });
      }
      if (max) {
        s.refine(v => isIsoDateLike(v) && cmpIso(v, max) <= 0, {
          message: `Date must be on/before ${max}`,
        });
      }
      
      return s;
    }

    default:
      return z.any();
  }
}

export function buildQuizSchema(quiz: Quiz) {
  const fieldEntries = Object.values(quiz.questions).map(q => {
    const base = schemaForQuestion(q);
    if (q.required) {
      if (q.type === QuestionType.ShortString || q.type === QuestionType.LongString) {
        (base as z.ZodString).min(1, { message: "Required" });
      }
      if (q.type === QuestionType.MultipleChoice) {
        (base as z.ZodArray<z.ZodTypeAny>).min(
          Math.max(1, q.validation?.minSelections ?? 1),
          { message: "Required" }
        );
      }

      return [q.id, base] as const;
    } else {
      return [q.id, base.optional()] as const;
    }
  });

  const shape = Object.fromEntries(fieldEntries) as Record<string, z.ZodTypeAny>;
  const schema = z.object(shape);

  const conditionalQs = Object.values(quiz.questions).filter(q => q.requiredWhen);

  if (conditionalQs.length > 0) {
    schema.superRefine((answers, ctx) => {
      for (const q of conditionalQs) {
        const cond = q.requiredWhen!;
        const ok = evalCondition(cond, answers);

        if (ok) {
          const val = (answers as Answers)[q.id];

          const empty =
            val === undefined ||
            val === null ||
            (typeof val === "string" && val.trim() === "") ||
            (Array.isArray(val) && val.length === 0);

          if (empty) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Required due to previous answer",
              path: [q.id],
            });
            continue;
          }

          const field = schema.shape[q.id];
          const res = field.safeParse(val);
          if (!res.success) {
            for (const issue of res.error.issues) {
              ctx.addIssue({
                ...issue,
                path: [q.id, ...(issue.path ?? [])],
              });
            }
          }
        }
      }
    });
  }
  
  return schema;
}