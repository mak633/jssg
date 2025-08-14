import { QuestionType, Quiz, QuizStatus } from '@shared/types/quiz';
import { User, UserRole } from '@shared/types/user';

export const dummyUsersRecord = 'dummyUsers';

export const dummyTokenPath = 'dummyTokenPath';
export const dummyUserJWT = 'dummyUserJWT';
export const dummyAdminJWT = 'dummyAdminJWT';

export const dummyUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    role: UserRole.User,
    token: 'dummyUserJWT',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'password456',
    role: UserRole.Admin,
    token: 'dummyAdminJWT',
  },
];

export const initialQuiz: Quiz = {
  id: 'tech-conf-2025',
  title: 'quiz_title',
  startQId: 'q1_attendee_type',
  status: QuizStatus.Published,
  version: '1.0.0',

  sections: {
    s1_profile: {
      id: 's1_profile',
      title: 's1_title',
      description: 's1_desc',
      qIds: ['q1_attendee_type', 'q2_speaker_title', 'q3_experience_years'],
      nextSectionId: 's2_preferences',
    },
    s2_preferences: {
      id: 's2_preferences',
      title: 's2_title',
      description: 's2_desc',
      qIds: [
        'q4_topics_of_interest',
        'q5_need_certificate',
        'q6_certificate_name',
        'q7_workshops_opt_in',
        'q8_workshop_selection',
      ],
      nextSectionId: 's3_logistics',
    },
    s3_logistics: {
      id: 's3_logistics',
      title: 's3_title',
      description: 's3_desc',
      qIds: ['q9_arrival_date', 'q10_dietary_preference', 'q11_tshirt_size'],
      nextSectionId: 'END',
    },
  },

  questions: {
    q1_attendee_type: {
      id: 'q1_attendee_type',
      title: 'q1_title',
      description: 'q1_desc',
      type: QuestionType.OneChoice,
      required: true,
      options: [
        { value: 'professional', label: 'q1_opt_professional' },
        { value: 'student', label: 'q1_opt_student' },
        { value: 'speaker', label: 'q1_opt_speaker' },
      ],
      routing: [
        {
          when: { op: 'eq', qId: 'q1_attendee_type', value: 'speaker' },
          goTo: 'q2_speaker_title',
        },
      ],
      nextQuestionId: 'q3_experience_years',
    },

    q2_speaker_title: {
      id: 'q2_speaker_title',
      title: 'q2_title',
      description: 'q2_desc',
      type: QuestionType.ShortString,
      requiredWhen: { op: 'eq', qId: 'q1_attendee_type', value: 'speaker' },
      validation: { minLength: 5, maxLength: 120 },
      nextQuestionId: 'q3_experience_years',
    },

    q3_experience_years: {
      id: 'q3_experience_years',
      title: 'q3_title',
      type: QuestionType.Number,
      required: true,
      validation: { min: 0, max: 50, step: 1 },
      nextQuestionId: 'q4_topics_of_interest',
    },

    q4_topics_of_interest: {
      id: 'q4_topics_of_interest',
      title: 'q4_title',
      description: 'q4_desc',
      type: QuestionType.MultipleChoice,
      required: true,
      options: [
        { value: 'ai', label: 'q4_opt_ai' },
        { value: 'web', label: 'q4_opt_web' },
        { value: 'security', label: 'q4_opt_security' },
        { value: 'data', label: 'q4_opt_data' },
        { value: 'ux', label: 'q4_opt_ux' },
      ],
      validation: { minSelections: 2 },
      nextQuestionId: 'q5_need_certificate',
    },

    q5_need_certificate: {
      id: 'q5_need_certificate',
      title: 'q5_title',
      type: QuestionType.Boolean,
      routing: [
        {
          when: { op: 'isTruthy', qId: 'q5_need_certificate' },
          goTo: 'q6_certificate_name',
        },
        {
          when: { op: 'isFalsy', qId: 'q5_need_certificate' },
          goTo: 'q7_workshops_opt_in',
        },
      ],
      nextQuestionId: 'q7_workshops_opt_in',
    },

    q6_certificate_name: {
      id: 'q6_certificate_name',
      title: 'q6_title',
      type: QuestionType.ShortString,
      requiredWhen: { op: 'isTruthy', qId: 'q5_need_certificate' },
      validation: { minLength: 3, maxLength: 80 },
      nextQuestionId: 'q7_workshops_opt_in',
    },

    q7_workshops_opt_in: {
      id: 'q7_workshops_opt_in',
      title: 'q7_title',
      type: QuestionType.Boolean,
      required: true,
      routing: [
        {
          when: { op: 'isTruthy', qId: 'q7_workshops_opt_in' },
          goTo: 'q8_workshop_selection',
        },
        {
          when: { op: 'isFalsy', qId: 'q7_workshops_opt_in' },
          goTo: 'q9_arrival_date',
        },
      ],
      nextQuestionId: 'q9_arrival_date',
    },

    q8_workshop_selection: {
      id: 'q8_workshop_selection',
      title: 'q8_title',
      description: 'q8_desc',
      type: QuestionType.MultipleChoice,
      requiredWhen: { op: 'isTruthy', qId: 'q7_workshops_opt_in' },
      options: [
        { value: 'docker', label: 'q8_opt_docker' },
        { value: 'data_design', label: 'q8_opt_data_design' },
        { value: 'ts_advanced', label: 'q8_opt_ts_advanced' },
        { value: 'ethical_ai', label: 'q8_opt_ethical_ai' },
      ],
      validation: { minSelections: 2, maxSelections: 3 },
      nextQuestionId: 'q9_arrival_date',
    },

    q9_arrival_date: {
      id: 'q9_arrival_date',
      title: 'q9_title',
      type: QuestionType.Date,
      required: true,
      validation: { min: '2025-09-10', max: '2025-10-05' },
      nextQuestionId: 'q10_dietary_preference',
    },

    q10_dietary_preference: {
      id: 'q10_dietary_preference',
      title: 'q10_title',
      type: QuestionType.OneChoice,
      options: [
        { value: 'none', label: 'q10_opt_none' },
        { value: 'vegetarian', label: 'q10_opt_vegetarian' },
        { value: 'vegan', label: 'q10_opt_vegan' },
        { value: 'halal', label: 'q10_opt_halal' },
        { value: 'kosher', label: 'q10_opt_kosher' },
        { value: 'gluten_free', label: 'q10_opt_gluten_free' },
      ],
      nextQuestionId: 'q11_tshirt_size',
    },

    q11_tshirt_size: {
      id: 'q11_tshirt_size',
      title: 'q11_title',
      type: QuestionType.OneChoice,
      required: true,
      options: [
        { value: 'xs', label: 'q11_opt_xs' },
        { value: 's', label: 'q11_opt_s' },
        { value: 'm', label: 'q11_opt_m' },
        { value: 'l', label: 'q11_opt_l' },
        { value: 'xl', label: 'q11_opt_xl' },
        { value: 'xxl', label: 'q11_opt_xxl' },
      ],
      nextQuestionId: 'END',
    },
  },
};
