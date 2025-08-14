import { z } from 'zod';

const schema = z.object({
  PORTAL_UI_BASE_URL: z.string().url(),
  ADMIN_UI_BASE_URL: z.string().url(),
  API_GATEWAY_BASE_URL: z.string().url(),
});

const data = {
  PORTAL_UI_BASE_URL: process.env.NEXT_PUBLIC_PORTAL_UI_BASE_URL,
  ADMIN_UI_BASE_URL: process.env.NEXT_PUBLIC_ADMIN_UI_BASE_URL,
  API_GATEWAY_BASE_URL: process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL,
};

export const environment = schema.parse(data);
