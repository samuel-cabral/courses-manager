import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { UsersRepository } from '@/repositories/users-repository'

interface GetProfileUseCaseRequest {
  userId: string
}

export class GetProfileUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ userId }: GetProfileUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UnauthorizedError()
    }

    return {
      user,
    }
  }
}
