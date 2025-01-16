import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { authenticate } from '@/http/controllers/auth/authenticate'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        summary: 'Authenticate user with email and password',
        tags: ['auth'],
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    authenticate,
  )
}
