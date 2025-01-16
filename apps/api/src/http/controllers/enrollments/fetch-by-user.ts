import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { ResourceNotFoundError } from '@/http/routes/_errors/resource-not-found-error'
import { PrismaEnrollmentsRepository } from '@/repositories/prisma/prisma-enrollments-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FetchUserEnrollmentsUseCase } from '@/use-cases/fetch-user-enrollments'

export async function fetchByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchUserEnrollmentsParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  try {
    const { userId } = fetchUserEnrollmentsParamsSchema.parse(request.params)

    const enrollmentsRepository = new PrismaEnrollmentsRepository()
    const usersRepository = new PrismaUsersRepository()

    const fetchUserEnrollmentsUseCase = new FetchUserEnrollmentsUseCase(
      enrollmentsRepository,
      usersRepository,
    )

    const { enrollments } = await fetchUserEnrollmentsUseCase.execute({
      userId,
    })

    return reply.status(200).send({
      enrollments: enrollments.map((enrollment) => ({
        id: enrollment.id,
        courseId: enrollment.course.id,
        course: {
          id: enrollment.course.id,
          title: enrollment.course.title,
          description: enrollment.course.description,
          hours: enrollment.course.hours,
        },
        enrolledAt: enrollment.enrolledAt.toISOString(),
      })),
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new BadRequestError('Validation error.')
    }

    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
