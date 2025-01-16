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
      throw new Error('User not found')
    }

    return {
      user,
    }
  }
}
