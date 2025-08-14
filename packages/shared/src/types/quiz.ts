export enum QuizStatus {
  Active = 'active',
  Draft = 'draft',
  Archived = 'archived',
}

export enum QuestionType {
  OneChoice,
  MultipleChoice,
  ShortString,
  LongString,
  Number,
  Boolean,
  Date,
}

export type Answer = string | number | boolean | null | string[];

export type Condition =
  | { op: 'isTruthy' | 'isFalsy'; qId: string }
  | { op: 'eq' | 'neq'; qId: string; value: string | number };

export interface RouteRule {
  when: Condition;
  goTo: string | 'END';
}

interface QuestionBase {
  id: string;
  title: string;
  description?: string;
  type: QuestionType;
  required?: boolean;
  requiredWhen?: Condition;
  routing?: RouteRule[];
  nextQuestionId?: string | 'END';
}

export interface ChoiceOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SingleChoiceQuestion extends QuestionBase {
  type: QuestionType.OneChoice;
  options: ChoiceOption[];
}

export interface MultiChoiceQuestion extends QuestionBase {
  type: QuestionType.MultipleChoice;
  options: ChoiceOption[];
  validation?: {
    minSelections?: number;
    maxSelections?: number;
  };
}

export interface BooleanQuestion extends QuestionBase {
  type: QuestionType.Boolean;
}

export interface NumberQuestion extends QuestionBase {
  type: QuestionType.Number;
  validation?: {
    min?: number;
    max?: number;
    step?: number;
  };
}

export interface ShortStringQuestion extends QuestionBase {
  type: QuestionType.ShortString;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface LongStringQuestion extends QuestionBase {
  type: QuestionType.LongString;
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
}

export interface DateQuestion extends QuestionBase {
  type: QuestionType.Date;
  validation?: {
    min?: string;
    max?: string;
  };
}

export type Question =
  | SingleChoiceQuestion
  | MultiChoiceQuestion
  | BooleanQuestion
  | NumberQuestion
  | ShortStringQuestion
  | LongStringQuestion
  | DateQuestion;

export interface Section {
  id: string;
  title: string;
  description?: string;
  qIds: string[];
  nextSectionId?: string | 'END';
}

export interface Quiz {
  id: string;
  title: string;
  startQId: string;
  status: QuizStatus;
  sections: Record<string, Section>;
  questions: Record<string, Question>;
  version?: string;
}

export type QuizAnswers = Record<string, Answer>;
