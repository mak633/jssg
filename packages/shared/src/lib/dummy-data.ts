import { QuestionType, Quiz, QuizStatus, UIWidget } from '@shared/types/quiz';
import { User, UserRole } from '@shared/types/user';

export const DUMMY_USERS_RECORD = 'dummyUsers';

export const dummyToken = 'dummyToken';
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
  title: 'Tech Conference 2025 Registration',
  startQId: 'q1_attendee_type',
  status: QuizStatus.Published,
  version: '1.0.0',

  sections: {
    s1_profile: {
      id: 's1_profile',
      title: 'Profile',
      description: 'Tell us about yourself.',
      qIds: ['q1_attendee_type', 'q2_speaker_title', 'q3_experience_years'],
      nextSectionId: 's2_preferences',
    },
    s2_preferences: {
      id: 's2_preferences',
      title: 'Preferences',
      description: 'Help us tailor your event experience.',
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
      title: 'Logistics',
      description: 'Arrival and on-site needs.',
      qIds: [
        'q9_arrival_date',
        'q10_checkin_time',
        'q11_dietary_preference',
        'q12_tshirt_size',
      ],
      nextSectionId: 'END',
    },
  },

  questions: {
    q1_attendee_type: {
      id: 'q1_attendee_type',
      title: 'What type of attendee are you?',
      description: 'Choose the option that best describes you.',
      type: QuestionType.OneChoice,
      required: true,
      ui: { widget: UIWidget.Radio },
      options: [
        { value: 'professional', label: 'Professional' },
        { value: 'student', label: 'Student' },
        { value: 'speaker', label: 'Speaker' },
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
      title: 'Talk title',
      description: 'Provide the working title of your session.',
      type: QuestionType.String,
      requiredWhen: { op: 'eq', qId: 'q1_attendee_type', value: 'speaker' },
      ui: {
        widget: UIWidget.Input,
        placeholder: 'e.g., Practical Type Safety',
      },
      validation: { minLength: 5, maxLength: 120 },
      nextQuestionId: 'q3_experience_years',
    },

    q3_experience_years: {
      id: 'q3_experience_years',
      title: 'Years of professional experience',
      type: QuestionType.Number,
      required: true,
      ui: { widget: UIWidget.Slider },
      validation: { min: 0, max: 50, step: 1 },
      nextQuestionId: 'q4_topics_of_interest',
    },

    q4_topics_of_interest: {
      id: 'q4_topics_of_interest',
      title: 'Select at least two topics you’re interested in',
      description: 'Choose all that apply (minimum 2).',
      type: QuestionType.MultipleChoice,
      required: true,
      ui: { widget: UIWidget.Checkbox },
      options: [
        { value: 'ai', label: 'AI & ML' },
        { value: 'web', label: 'Web Engineering' },
        { value: 'security', label: 'Security' },
        { value: 'data', label: 'Data Engineering' },
        { value: 'ux', label: 'UX & Product' },
      ],
      validation: { minSelections: 2 },
      nextQuestionId: 'q5_need_certificate',
    },

    q5_need_certificate: {
      id: 'q5_need_certificate',
      title: 'Do you need a certificate of attendance?',
      type: QuestionType.Boolean,
      ui: { widget: UIWidget.Switch },
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
      title: 'Full name for the certificate',
      type: QuestionType.String,
      requiredWhen: { op: 'isTruthy', qId: 'q5_need_certificate' },
      ui: {
        widget: UIWidget.Input,
        placeholder: 'As it should appear on the certificate',
      },
      validation: { minLength: 3, maxLength: 80, pattern: "^[\\p{L} .'-]+$" },
      nextQuestionId: 'q7_workshops_opt_in',
    },

    q7_workshops_opt_in: {
      id: 'q7_workshops_opt_in',
      title: 'Would you like to attend pre-conference workshops?',
      type: QuestionType.Boolean,
      required: true,
      ui: { widget: UIWidget.Switch },
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
      title: 'Select at least two workshops',
      description: 'Workshops have limited seats.',
      type: QuestionType.MultipleChoice,
      requiredWhen: { op: 'eq', qId: 'q7_workshops_opt_in', value: 'yes' },
      ui: { widget: UIWidget.Checkbox },
      options: [
        { value: 'docker', label: 'Docker Deep Dive' },
        { value: 'data_design', label: 'Designing with Data' },
        { value: 'ts_advanced', label: 'Advanced TypeScript' },
        { value: 'ethical_ai', label: 'Ethical AI in Practice' },
      ],
      validation: { minSelections: 2, maxSelections: 3 },
      nextQuestionId: 'q9_arrival_date',
    },

    q9_arrival_date: {
      id: 'q9_arrival_date',
      title: 'Arrival date',
      type: QuestionType.Date,
      required: true,
      ui: { widget: UIWidget.Date },
      validation: { min: '2025-09-10', max: '2025-10-05' },
      nextQuestionId: 'q10_checkin_time',
    },

    q10_checkin_time: {
      id: 'q10_checkin_time',
      title: 'Estimated hotel check-in time',
      type: QuestionType.DateTime,
      ui: { widget: UIWidget.DateTime },
      validation: { min: '2025-09-10T08:00:00Z', max: '2025-10-05T22:00:00Z' },
      nextQuestionId: 'q11_dietary_preference',
    },

    q11_dietary_preference: {
      id: 'q11_dietary_preference',
      title: 'Dietary preference',
      type: QuestionType.OneChoice,
      ui: { widget: UIWidget.Select },
      options: [
        { value: 'none', label: 'None' },
        { value: 'vegetarian', label: 'Vegetarian' },
        { value: 'vegan', label: 'Vegan' },
        { value: 'halal', label: 'Halal' },
        { value: 'kosher', label: 'Kosher' },
        { value: 'gluten_free', label: 'Gluten-free' },
      ],
      nextQuestionId: 'q12_tshirt_size',
    },

    q12_tshirt_size: {
      id: 'q12_tshirt_size',
      title: 'T-shirt size',
      type: QuestionType.OneChoice,
      required: true,
      ui: { widget: UIWidget.Select },
      options: [
        { value: 'xs', label: 'XS' },
        { value: 's', label: 'S' },
        { value: 'm', label: 'M' },
        { value: 'l', label: 'L' },
        { value: 'xl', label: 'XL' },
        { value: 'xxl', label: 'XXL' },
      ],
      nextQuestionId: 'END',
    },
  },
};
