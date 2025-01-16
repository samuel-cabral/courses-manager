import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '@/use-cases/get-user'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getUserParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getUserParamsSchema.parse(request.params)

  try {
    const usersRepository = new PrismaUsersRepository()
    const getUserUseCase = new GetUserUseCase(usersRepository)

    const { user } = await getUserUseCase.execute({
      userId: id,
    })

    return reply.status(200).send({ user })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
