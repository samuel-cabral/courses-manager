import { api } from './api-client'

export interface Course {
  id: string
  title: string
  description: string
  hours: number
  createdAt: string
}

interface GetCoursesResponse {
  courses: Course[]
}

export async function getCourses() {
  const response = await api.get('courses').json<GetCoursesResponse>()
  return response
}
