import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    SERVER_PORT: z.coerce.number().default(3333),

    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  shared: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    SERVER_PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  emptyStringAsUndefined: true,
})
