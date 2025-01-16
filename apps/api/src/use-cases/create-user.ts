import { hash } from 'bcryptjs'

import { ConflictError } from '@/http/routes/_errors/conflict-error'
import { UsersRepository } from '@/repositories/users-repository'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password }: CreateUserUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new ConflictError('Email already exists.')
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    })

    return {
      user,
    }
  }
}
