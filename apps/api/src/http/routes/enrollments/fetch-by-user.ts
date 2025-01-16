import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { fetchByUser } from '@/http/controllers/enrollments/fetch-by-user'

export async function fetchUserEnrollments(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/enrollments/:userId',
    {
      schema: {
        summary: 'List user enrollments',
        tags: ['enrollments'],
        security: [{ bearerAuth: [] }],
        params: z.object({
          userId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            enrollments: z.array(
              z.object({
                id: z.string(),
                courseId: z.string(),
                course: z.object({
                  id: z.string(),
                  title: z.string(),
                  description: z.string(),
                  hours: z.number(),
                }),
                enrolledAt: z.string(),
              }),
            ),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    fetchByUser,
  )
}
