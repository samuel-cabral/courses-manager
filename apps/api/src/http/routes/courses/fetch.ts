import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { fetch } from '@/http/controllers/courses/fetch'

export async function fetchCourses(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/courses',
    {
      schema: {
        summary: 'List all courses',
        tags: ['courses'],
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                description: z.string(),
                hours: z.number(),
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
