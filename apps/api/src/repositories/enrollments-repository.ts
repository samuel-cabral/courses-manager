export interface CreateEnrollmentDTO {
  userId: string
  courseId: string
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  enrolledAt: Date
}

export interface EnrollmentWithCourse extends Enrollment {
  course: {
    id: string
    createdAt: Date
    title: string
    description: string
    hours: number
  }
}

export interface EnrollmentsRepository {
  create(data: CreateEnrollmentDTO): Promise<Enrollment>
  findByUserIdAndCourseId(
    userId: string,
    courseId: string,
  ): Promise<Enrollment | null>
  findManyByUserId(userId: string): Promise<EnrollmentWithCourse[]>
}
