import { ConflictError } from '@/http/routes/_errors/conflict-error'
import { ResourceNotFoundError } from '@/http/routes/_errors/resource-not-found-error'
import { CoursesRepository } from '@/repositories/courses-repository'
import { EnrollmentsRepository } from '@/repositories/enrollments-repository'
import { UsersRepository } from '@/repositories/users-repository'

interface CreateEnrollmentUseCaseRequest {
  userId: string
  courseId: string
}

export class CreateEnrollmentUseCase {
  constructor(
    private enrollmentsRepository: EnrollmentsRepository,
    private usersRepository: UsersRepository,
    private coursesRepository: CoursesRepository,
  ) {
    this.enrollmentsRepository = enrollmentsRepository
    this.usersRepository = usersRepository
    this.coursesRepository = coursesRepository
  }

  async execute({ userId, courseId }: CreateEnrollmentUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError('User not found.')
    }

    const course = await this.coursesRepository.findById(courseId)

    if (!course) {
      throw new ResourceNotFoundError('Course not found.')
    }

    const enrollmentAlreadyExists =
      await this.enrollmentsRepository.findByUserIdAndCourseId(userId, courseId)

    if (enrollmentAlreadyExists) {
      throw new ConflictError('User already enrolled in this course.')
    }

    const enrollment = await this.enrollmentsRepository.create({
      userId,
      courseId,
    })

    return {
      enrollment,
    }
  }
}
