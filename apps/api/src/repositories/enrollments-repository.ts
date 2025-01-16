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

export interface EnrollmentsRepository {
  create(data: CreateEnrollmentDTO): Promise<Enrollment>
  findByUserIdAndCourseId(
    userId: string,
    courseId: string,
  ): Promise<Enrollment | null>
}
