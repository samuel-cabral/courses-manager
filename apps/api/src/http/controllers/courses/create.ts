import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { PrismaCoursesRepository } from '@/repositories/prisma/prisma-courses-repository'
import { CreateCourseUseCase } from '@/use-cases/create-course'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCourseBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    hours: z.number().min(1),
  })

  try {
    const { title, description, hours } = createCourseBodySchema.parse(
      request.body,
    )

    const coursesRepository = new PrismaCoursesRepository()
    const createCourseUseCase = new CreateCourseUseCase(coursesRepository)

    const { course } = await createCourseUseCase.execute({
      title,
      description,
      hours,
    })

    return reply.status(201).send({ course })
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new BadRequestError('Validation error.')
    }

    throw err
  }
}
