import { CoursesRepository } from '@/repositories/courses-repository'

interface CreateCourseUseCaseRequest {
  title: string
  description: string
  hours: number
}

export class CreateCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) {
    this.coursesRepository = coursesRepository
  }

  async execute({ title, description, hours }: CreateCourseUseCaseRequest) {
    const course = await this.coursesRepository.create({
      title,
      description,
      hours,
    })

    return {
      course,
    }
  }
}
