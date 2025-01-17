import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { fetch } from '@/http/controllers/users/fetch'

export async function fetchUsers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users',
    {
      schema: {
        summary: 'List all users',
        tags: ['users'],
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            users: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
                createdAt: z.string(),
              }),
            ),
          }),
        },
      },
    },
    fetch,
  )
}
