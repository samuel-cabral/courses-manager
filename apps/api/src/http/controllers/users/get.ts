import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { ResourceNotFoundError } from '@/http/routes/_errors/resource-not-found-error'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '@/use-cases/get-user'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getUserParamsSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = getUserParamsSchema.parse(request.params)

    const usersRepository = new PrismaUsersRepository()
    const getUserUseCase = new GetUserUseCase(usersRepository)

    const { user } = await getUserUseCase.execute({
      userId: id,
    })

    return reply.status(200).send({ user })
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
