import { z } from 'zod';
import { insertMoodLogSchema, moodLogs, resources } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  moodLogs: {
    create: {
      method: 'POST' as const,
      path: '/api/mood-logs' as const,
      input: insertMoodLogSchema,
      responses: {
        201: z.custom<typeof moodLogs.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  resources: {
    list: {
      method: 'GET' as const,
      path: '/api/resources' as const,
      responses: {
        200: z.array(z.custom<typeof resources.$inferSelect>()),
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type CreateMoodLogInput = z.infer<typeof api.moodLogs.create.input>;
export type ResourcesList = z.infer<typeof api.resources.list.responses[200]>;
