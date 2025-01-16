import { ResourceNotFoundError } from '@/http/routes/_errors/resource-not-found-error'
import { UsersRepository } from '@/repositories/users-repository'

interface GetUserUseCaseRequest {
  userId: string
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ userId }: GetUserUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError('User not found.')
    }

    return {
      user,
    }
  }
}
