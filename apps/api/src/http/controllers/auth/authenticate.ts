import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  try {
    const { email, password } = authenticateBodySchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        sub: user.id,
      },
      {
        sign: {
          expiresIn: '7d',
        },
      },
    )

    return reply.status(201).send({ token })
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new BadRequestError('Validation error.')
    }

    if (err instanceof UnauthorizedError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }
}
