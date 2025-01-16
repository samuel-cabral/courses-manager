import { ResourceNotFoundError } from '@/http/routes/_errors/resource-not-found-error'
import { EnrollmentsRepository } from '@/repositories/enrollments-repository'
import { UsersRepository } from '@/repositories/users-repository'

interface FetchUserEnrollmentsUseCaseRequest {
  userId: string
}

export class FetchUserEnrollmentsUseCase {
  constructor(
    private enrollmentsRepository: EnrollmentsRepository,
    private usersRepository: UsersRepository,
  ) {
    this.enrollmentsRepository = enrollmentsRepository
    this.usersRepository = usersRepository
  }

  async execute({ userId }: FetchUserEnrollmentsUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError('User not found.')
    }

    const enrollments =
      await this.enrollmentsRepository.findManyByUserId(userId)

    return {
      enrollments,
    }
  }
}
