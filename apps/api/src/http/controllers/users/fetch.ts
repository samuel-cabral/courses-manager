import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FetchUsersUseCase } from '@/use-cases/fetch-users'

export async function fetch(_: FastifyRequest, reply: FastifyReply) {
  const usersRepository = new PrismaUsersRepository()
  const fetchUsersUseCase = new FetchUsersUseCase(usersRepository)

  const { users } = await fetchUsersUseCase.execute()

  return reply.status(200).send({
    users: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    })),
  })
}
