import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { ConflictError } from '@/http/routes/_errors/conflict-error'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '@/use-cases/create-user'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  try {
    const { name, email, password } = createUserBodySchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    await createUserUseCase.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send({ message: 'User created' })
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new BadRequestError('Validation error.')
    }

    if (err instanceof ConflictError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
