import { prisma } from '@/lib/prisma'

import type { CoursesRepository, CreateCourseDTO } from '../courses-repository'

export class PrismaCoursesRepository implements CoursesRepository {
  async create(data: CreateCourseDTO) {
    const course = await prisma.course.create({
      data,
    })

    return course
  }
}
