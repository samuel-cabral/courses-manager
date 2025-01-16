import { compare } from 'bcryptjs'

import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { UsersRepository } from '@/repositories/users-repository'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedError('Invalid credentials.')
    }

    const doesPasswordMatch = await compare(password, user.passwordHash)

    if (!doesPasswordMatch) {
      throw new UnauthorizedError('Invalid credentials.')
    }

    return {
      user,
    }
  }
}
