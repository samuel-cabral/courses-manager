import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { create } from '@/http/controllers/enrollments/create'

export async function createEnrollment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/enrollments',
    {
      schema: {
        summary: 'Enroll user in a course',
        tags: ['enrollments'],
        security: [{ bearerAuth: [] }],
        body: z.object({
          courseId: z.string().uuid(),
          userId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            enrollment: z.object({
              id: z.string(),
              userId: z.string(),
              courseId: z.string(),
              enrolledAt: z.string(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    create,
  )
}
