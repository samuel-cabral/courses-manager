import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetProfileUseCase } from '@/use-cases/get-profile'

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const usersRepository = new PrismaUsersRepository()
  const getProfileUseCase = new GetProfileUseCase(usersRepository)

  const { user } = await getProfileUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      createdAt: user.createdAt.toISOString(),
    },
  })
}
