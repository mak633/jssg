import { QuestionType, Quiz, QuizStatus } from '@shared/types/quiz';

import { buildQuizSchema } from '../../../utils/build-quiz-schema';

describe('buildQuizSchema', () => {
  const createBasicQuiz = (): Quiz => ({
    id: 'test-quiz',
    title: 'Test Quiz',
    startQId: 'q1',
    status: QuizStatus.Active,
    version: '1.0.0',
    sections: {
      s1: {
        id: 's1',
        title: 'Section 1',
        description: 'Test section',
        qIds: ['q1', 'q2'],
        nextSectionId: 'END',
      },
    },
    questions: {
      q1: {
        id: 'q1',
        title: 'Question 1',
        type: QuestionType.OneChoice,
        required: true,
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
        nextQuestionId: 'q2',
      },
      q2: {
        id: 'q2',
        title: 'Question 2',
        type: QuestionType.ShortString,
        required: false,
        nextQuestionId: 'END',
      },
    },
  });

  describe('Required validation', () => {
    it('should validate required OneChoice questions', () => {
      const quiz = createBasicQuiz();
      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: '', q2: 'valid' };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['q1']);
        expect(result.error.issues[0].message).toBe('This field is required');
      }
    });

    it('should pass validation for valid required OneChoice questions', () => {
      const quiz = createBasicQuiz();
      const schema = buildQuizSchema(quiz);

      const validData = { q1: 'option1', q2: 'valid' };
      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('should not validate non-required questions when empty', () => {
      const quiz = createBasicQuiz();
      const schema = buildQuizSchema(quiz);

      const validData = { q1: 'option1', q2: '' };
      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
    });
  });

  describe('Conditional validation (requiredWhen)', () => {
    it('should validate conditionally required fields when condition is met', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1_attendee_type: {
            id: 'q1_attendee_type',
            title: 'Attendee Type',
            type: QuestionType.OneChoice,
            required: true,
            options: [
              { value: 'student', label: 'Student' },
              { value: 'speaker', label: 'Speaker' },
            ],
            nextQuestionId: 'q2_speaker_title',
          },
          q2_speaker_title: {
            id: 'q2_speaker_title',
            title: 'Speaker Title',
            type: QuestionType.ShortString,
            requiredWhen: {
              op: 'eq',
              qId: 'q1_attendee_type',
              value: 'speaker',
            },
            validation: { minLength: 5, maxLength: 120 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      // When speaker is selected but no title provided
      const invalidData = { q1_attendee_type: 'speaker', q2_speaker_title: '' };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['q2_speaker_title']);
        expect(result.error.issues[0].message).toBe('This field is required');
      }
    });

    it('should not validate conditionally required fields when condition is not met', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1_attendee_type: {
            id: 'q1_attendee_type',
            title: 'Attendee Type',
            type: QuestionType.OneChoice,
            required: true,
            options: [
              { value: 'student', label: 'Student' },
              { value: 'speaker', label: 'Speaker' },
            ],
            nextQuestionId: 'q2_speaker_title',
          },
          q2_speaker_title: {
            id: 'q2_speaker_title',
            title: 'Speaker Title',
            type: QuestionType.ShortString,
            requiredWhen: {
              op: 'eq',
              qId: 'q1_attendee_type',
              value: 'speaker',
            },
            validation: { minLength: 5, maxLength: 120 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      // When student is selected, speaker title is not required
      const validData = { q1_attendee_type: 'student', q2_speaker_title: '' };
      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('should validate minLength when conditionally required field has content', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1_attendee_type: {
            id: 'q1_attendee_type',
            title: 'Attendee Type',
            type: QuestionType.OneChoice,
            required: true,
            options: [
              { value: 'student', label: 'Student' },
              { value: 'speaker', label: 'Speaker' },
            ],
            nextQuestionId: 'q2_speaker_title',
          },
          q2_speaker_title: {
            id: 'q2_speaker_title',
            title: 'Speaker Title',
            type: QuestionType.ShortString,
            requiredWhen: {
              op: 'eq',
              qId: 'q1_attendee_type',
              value: 'speaker',
            },
            validation: { minLength: 5, maxLength: 120 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      // When speaker is selected with short title
      const invalidData = {
        q1_attendee_type: 'speaker',
        q2_speaker_title: 'abc',
      };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['q2_speaker_title']);
        expect(result.error.issues[0].message).toBe(
          'Minimum 5 characters required'
        );
      }
    });

    it('should pass validation when conditionally required field meets all criteria', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1_attendee_type: {
            id: 'q1_attendee_type',
            title: 'Attendee Type',
            type: QuestionType.OneChoice,
            required: true,
            options: [
              { value: 'student', label: 'Student' },
              { value: 'speaker', label: 'Speaker' },
            ],
            nextQuestionId: 'q2_speaker_title',
          },
          q2_speaker_title: {
            id: 'q2_speaker_title',
            title: 'Speaker Title',
            type: QuestionType.ShortString,
            requiredWhen: {
              op: 'eq',
              qId: 'q1_attendee_type',
              value: 'speaker',
            },
            validation: { minLength: 5, maxLength: 120 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      // When speaker is selected with valid title
      const validData = {
        q1_attendee_type: 'speaker',
        q2_speaker_title: 'Chief Technology Officer',
      };
      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
    });
  });

  describe('String validation', () => {
    it('should validate minLength for ShortString', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Name',
            type: QuestionType.ShortString,
            required: true,
            validation: { minLength: 3, maxLength: 50 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: 'ab' };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Minimum 3 characters required'
        );
      }
    });

    it('should validate maxLength for ShortString', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Name',
            type: QuestionType.ShortString,
            required: true,
            validation: { minLength: 3, maxLength: 5 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: 'this is too long' };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Maximum 5 characters allowed'
        );
      }
    });

    it('should validate pattern for ShortString', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Email',
            type: QuestionType.ShortString,
            required: true,
            validation: { pattern: '^[^@]+@[^@]+\\.[^@]+$' },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: 'invalid-email' };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid format');
      }
    });
  });

  describe('MultipleChoice validation', () => {
    it('should validate required MultipleChoice', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Topics',
            type: QuestionType.MultipleChoice,
            required: true,
            options: [
              { value: 'topic1', label: 'Topic 1' },
              { value: 'topic2', label: 'Topic 2' },
            ],
            validation: { minSelections: 1 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: [] };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('This field is required');
      }
    });

    it('should validate minSelections for MultipleChoice', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Topics',
            type: QuestionType.MultipleChoice,
            required: true,
            options: [
              { value: 'topic1', label: 'Topic 1' },
              { value: 'topic2', label: 'Topic 2' },
            ],
            validation: { minSelections: 2 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: ['topic1'] };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Please select at least 2 options'
        );
      }
    });

    it('should validate maxSelections for MultipleChoice', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Topics',
            type: QuestionType.MultipleChoice,
            required: true,
            options: [
              { value: 'topic1', label: 'Topic 1' },
              { value: 'topic2', label: 'Topic 2' },
              { value: 'topic3', label: 'Topic 3' },
            ],
            validation: { maxSelections: 2 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: ['topic1', 'topic2', 'topic3'] };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Please select no more than 2 options'
        );
      }
    });
  });

  describe('Number validation', () => {
    it('should validate required Number', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Age',
            type: QuestionType.Number,
            required: true,
            validation: { min: 0, max: 120 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: NaN };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('This field is required');
      }
    });

    it('should validate min value for Number', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Age',
            type: QuestionType.Number,
            required: true,
            validation: { min: 18, max: 120 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: 16 };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Value must be at least 18'
        );
      }
    });

    it('should validate max value for Number', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Age',
            type: QuestionType.Number,
            required: true,
            validation: { min: 0, max: 120 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: 150 };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Value must be at most 120'
        );
      }
    });
  });

  describe('Boolean validation', () => {
    it('should validate required Boolean', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Accept Terms',
            type: QuestionType.Boolean,
            required: true,
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: undefined };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('This field is required');
      }
    });

    it('should pass validation for valid Boolean', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Accept Terms',
            type: QuestionType.Boolean,
            required: true,
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const validData = { q1: true };
      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
    });
  });

  describe('Date validation', () => {
    it('should validate required Date', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Birth Date',
            type: QuestionType.Date,
            required: true,
            validation: { min: '1900-01-01', max: '2025-12-31' },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: '' };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('This field is required');
      }
    });

    it('should validate min date', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Event Date',
            type: QuestionType.Date,
            required: true,
            validation: { min: '2025-01-01', max: '2025-12-31' },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: '2024-12-31' };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Date must be after 2025-01-01'
        );
      }
    });

    it('should validate max date', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Event Date',
            type: QuestionType.Date,
            required: true,
            validation: { min: '2025-01-01', max: '2025-12-31' },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: '2026-01-01' };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Date must be before 2025-12-31'
        );
      }
    });
  });

  describe('Condition operators', () => {
    it('should handle neq operator', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Type',
            type: QuestionType.OneChoice,
            required: true,
            options: [
              { value: 'type1', label: 'Type 1' },
              { value: 'type2', label: 'Type 2' },
            ],
            nextQuestionId: 'q2',
          },
          q2: {
            id: 'q2',
            title: 'Special Field',
            type: QuestionType.ShortString,
            requiredWhen: { op: 'neq', qId: 'q1', value: 'type1' },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: 'type2', q2: '' };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['q2']);
      }
    });

    it('should handle isTruthy operator', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Need Certificate',
            type: QuestionType.Boolean,
            required: true,
            nextQuestionId: 'q2',
          },
          q2: {
            id: 'q2',
            title: 'Certificate Name',
            type: QuestionType.ShortString,
            requiredWhen: { op: 'isTruthy', qId: 'q1' },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const invalidData = { q1: true, q2: '' };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['q2']);
      }
    });

    it('should handle isFalsy operator', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1: {
            id: 'q1',
            title: 'Has Experience',
            type: QuestionType.Boolean,
            required: true,
            nextQuestionId: 'q2',
          },
          q2: {
            id: 'q2',
            title: 'Training Needed',
            type: QuestionType.ShortString,
            requiredWhen: { op: 'isFalsy', qId: 'q1' },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      // Should be required when q1 is falsy
      const invalidData = { q1: false, q2: '' };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['q2']);
      }
    });
  });

  describe('Complex scenarios', () => {
    it('should handle multiple conditional validations', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1_attendee_type: {
            id: 'q1_attendee_type',
            title: 'Attendee Type',
            type: QuestionType.OneChoice,
            required: true,
            options: [
              { value: 'student', label: 'Student' },
              { value: 'speaker', label: 'Speaker' },
            ],
            nextQuestionId: 'q2_speaker_title',
          },
          q2_speaker_title: {
            id: 'q2_speaker_title',
            title: 'Speaker Title',
            type: QuestionType.ShortString,
            requiredWhen: {
              op: 'eq',
              qId: 'q1_attendee_type',
              value: 'speaker',
            },
            validation: { minLength: 5 },
            nextQuestionId: 'q3_need_certificate',
          },
          q3_need_certificate: {
            id: 'q3_need_certificate',
            title: 'Need Certificate',
            type: QuestionType.Boolean,
            required: true,
            nextQuestionId: 'q4_certificate_name',
          },
          q4_certificate_name: {
            id: 'q4_certificate_name',
            title: 'Certificate Name',
            type: QuestionType.ShortString,
            requiredWhen: { op: 'isTruthy', qId: 'q3_need_certificate' },
            validation: { minLength: 3 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      // Speaker selected but missing title, certificate needed but missing name
      const invalidData = {
        q1_attendee_type: 'speaker',
        q2_speaker_title: '',
        q3_need_certificate: true,
        q4_certificate_name: '',
      };
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2);
        const paths = result.error.issues.map((issue) => issue.path[0]);
        expect(paths).toContain('q2_speaker_title');
        expect(paths).toContain('q4_certificate_name');
      }
    });

    it('should validate all rules when multiple conditions are met', () => {
      const quiz: Quiz = {
        ...createBasicQuiz(),
        questions: {
          q1_attendee_type: {
            id: 'q1_attendee_type',
            title: 'Attendee Type',
            type: QuestionType.OneChoice,
            required: true,
            options: [
              { value: 'student', label: 'Student' },
              { value: 'speaker', label: 'Speaker' },
            ],
            nextQuestionId: 'q2_speaker_title',
          },
          q2_speaker_title: {
            id: 'q2_speaker_title',
            title: 'Speaker Title',
            type: QuestionType.ShortString,
            requiredWhen: {
              op: 'eq',
              qId: 'q1_attendee_type',
              value: 'speaker',
            },
            validation: { minLength: 5, maxLength: 120 },
            nextQuestionId: 'END',
          },
        },
      };

      const schema = buildQuizSchema(quiz);

      const validData = {
        q1_attendee_type: 'speaker',
        q2_speaker_title: 'Chief Technology Officer',
      };
      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
    });
  });
});
