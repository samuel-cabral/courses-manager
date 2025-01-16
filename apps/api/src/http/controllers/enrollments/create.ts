import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { ConflictError } from '@/http/routes/_errors/conflict-error'
import { ResourceNotFoundError } from '@/http/routes/_errors/resource-not-found-error'
import { PrismaCoursesRepository } from '@/repositories/prisma/prisma-courses-repository'
import { PrismaEnrollmentsRepository } from '@/repositories/prisma/prisma-enrollments-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateEnrollmentUseCase } from '@/use-cases/create-enrollment'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createEnrollmentBodySchema = z.object({
    courseId: z.string().uuid(),
    userId: z.string().uuid(),
  })

  try {
    const { courseId, userId } = createEnrollmentBodySchema.parse(request.body)

    const enrollmentsRepository = new PrismaEnrollmentsRepository()
    const usersRepository = new PrismaUsersRepository()
    const coursesRepository = new PrismaCoursesRepository()

    const createEnrollmentUseCase = new CreateEnrollmentUseCase(
      enrollmentsRepository,
      usersRepository,
      coursesRepository,
    )

    const { enrollment } = await createEnrollmentUseCase.execute({
      userId,
      courseId,
    })

    return reply.status(201).send({
      enrollment: {
        ...enrollment,
        enrolledAt: enrollment.enrolledAt.toISOString(),
      },
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new BadRequestError('Validation error.')
    }

    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof ConflictError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
