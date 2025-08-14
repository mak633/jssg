import { z } from 'zod';

const schema = z.object({
  LOGIN_UI_BASE_URL: z.string().url(),
  API_GATEWAY_BASE_URL: z.string().url(),
});

const data = {
  LOGIN_UI_BASE_URL: process.env.NEXT_PUBLIC_LOGIN_UI_BASE_URL,
  API_GATEWAY_BASE_URL: process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL,
};

export const environment = schema.parse(data);
