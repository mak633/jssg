import { z } from 'zod';

const schema = z.object({
  IDENTITY_SERVICE_BASE_URL: z.string().url(),
  LOGIN_UI_BASE_URL: z.string().url(),
  PORTAL_UI_BASE_URL: z.string().url(),
  ADMIN_UI_BASE_URL: z.string().url(),
  API_GATEWAY_BASE_URL: z
    .string()
    .url()
    .optional()
    .or(z.literal(''))
    .default(''),
});

const data = {
  IDENTITY_SERVICE_BASE_URL: process.env.NEXT_PUBLIC_IDENTITY_SERVICE_BASE_URL,
  LOGIN_UI_BASE_URL: process.env.NEXT_PUBLIC_LOGIN_UI_BASE_URL,
  PORTAL_UI_BASE_URL: process.env.NEXT_PUBLIC_PORTAL_UI_BASE_URL,
  ADMIN_UI_BASE_URL: process.env.NEXT_PUBLIC_ADMIN_UI_BASE_URL,
  API_GATEWAY_BASE_URL: process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL,
};

export const environment = schema.parse(data);
