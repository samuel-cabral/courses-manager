import { CoursesRepository } from '@/repositories/courses-repository'

export class FetchCoursesUseCase {
  constructor(private coursesRepository: CoursesRepository) {
    this.coursesRepository = coursesRepository
  }

  async execute() {
    const courses = await this.coursesRepository.findMany()

    return {
      courses,
    }
  }
}
