import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaCoursesRepository } from '@/repositories/prisma/prisma-courses-repository'
import { FetchCoursesUseCase } from '@/use-cases/fetch-courses'

export async function fetch(_: FastifyRequest, reply: FastifyReply) {
  const coursesRepository = new PrismaCoursesRepository()
  const fetchCoursesUseCase = new FetchCoursesUseCase(coursesRepository)

  const { courses } = await fetchCoursesUseCase.execute()

  return reply.status(200).send({
    courses: courses.map((course) => ({
      ...course,
      createdAt: course.createdAt.toISOString(),
    })),
  })
}
