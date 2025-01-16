export interface CreateCourseDTO {
  title: string
  description: string
  hours: number
}

export interface Course {
  id: string
  title: string
  description: string
  hours: number
  createdAt: Date
}

export interface CoursesRepository {
  create(data: CreateCourseDTO): Promise<Course>
  findMany(): Promise<Course[]>
  findById(id: string): Promise<Course | null>
}
