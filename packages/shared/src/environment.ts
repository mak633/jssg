import { z } from 'zod';

const schema = z.object({
  API_GATEWAY_BASE_URL: z
    .string()
    .url()
    .optional()
    .or(z.literal(''))
    .default(''),
});

const data = {
  API_GATEWAY_BASE_URL: process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL,
};

export const environment = schema.parse(data);
