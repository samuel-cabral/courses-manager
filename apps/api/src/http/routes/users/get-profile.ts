import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getProfile } from '@/http/controllers/users/get-profile'

export async function getProfileRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/profile',
    {
      schema: {
        summary: 'Get logged user profile',
        tags: ['users'],
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              createdAt: z.string(),
            }),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    getProfile,
  )
}
