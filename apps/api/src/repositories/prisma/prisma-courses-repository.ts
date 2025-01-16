import { prisma } from '@/lib/prisma'

import type { CoursesRepository, CreateCourseDTO } from '../courses-repository'

export class PrismaCoursesRepository implements CoursesRepository {
  async create(data: CreateCourseDTO) {
    const course = await prisma.course.create({
      data,
    })

    return course
  }

  async findMany() {
    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return courses
  }

  async findById(id: string) {
    const course = await prisma.course.findUnique({
      where: { id },
    })

    return course
  }
}
