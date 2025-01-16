import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaCoursesRepository } from '@/repositories/prisma/prisma-courses-repository'
import { CreateCourseUseCase } from '@/use-cases/create-course'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCourseBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    hours: z.number().min(1),
  })

  const { title, description, hours } = createCourseBodySchema.parse(
    request.body,
  )

  try {
    const coursesRepository = new PrismaCoursesRepository()
    const createCourseUseCase = new CreateCourseUseCase(coursesRepository)

    const { course } = await createCourseUseCase.execute({
      title,
      description,
      hours,
    })

    return reply.status(201).send({ course })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
