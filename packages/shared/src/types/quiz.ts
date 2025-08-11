export enum QuizStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}

export enum QuestionType {
  OneChoice,
  MultipleChoice,
  ShortAnswer,
  Boolean,
  Number,
  String,
  Date,
  DateTime,
}

export enum UIWidget {
  Radio,
  Checkbox,
  Select,
  Switch,
  Slider,
  Date,
  DateTime,
  Input,
}

export type Condition =
  | { op: 'and'; conditions: Condition[] }
  | { op: 'or'; conditions: Condition[] }
  | { op: 'not'; condition: Condition }
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
  ui?: {
    widget?: UIWidget;
    placeholder?: string;
  };
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

export interface StringQuestion extends QuestionBase {
  type: QuestionType.String;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface DateQuestion extends QuestionBase {
  type: QuestionType.Date;
  validation?: {
    min?: string;
    max?: string;
  };
}

export interface DateTimeQuestion extends QuestionBase {
  type: QuestionType.DateTime;
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
  | StringQuestion
  | DateQuestion
  | DateTimeQuestion;

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
