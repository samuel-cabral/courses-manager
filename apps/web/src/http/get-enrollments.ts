import { api } from './api-client'

interface Course {
  id: string
  title: string
  description: string
  hours: number
}

export interface Enrollment {
  id: string
  courseId: string
  course: Course
  enrolledAt: string
}

interface GetEnrollmentsResponse {
  enrollments: Enrollment[]
}

export async function getEnrollments(userId: string) {
  const response = await api
    .get(`enrollments/${userId}`)
    .json<GetEnrollmentsResponse>()
  return response
}
