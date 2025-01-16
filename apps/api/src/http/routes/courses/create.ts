import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { create } from '@/http/controllers/courses/create'

export async function createCourse(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/courses',
    {
      schema: {
        summary: 'Create a new course',
        tags: ['courses'],
        security: [{ bearerAuth: [] }],
        body: z.object({
          title: z.string(),
          description: z.string(),
          hours: z.number().min(1),
        }),
        response: {
          201: z.object({
            course: z.object({
              id: z.string(),
              title: z.string(),
              description: z.string(),
              hours: z.number(),
              createdAt: z.date(),
            }),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    create,
  )
}
