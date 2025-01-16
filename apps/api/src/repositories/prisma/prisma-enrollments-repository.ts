import { prisma } from '@/lib/prisma'

import type {
  CreateEnrollmentDTO,
  EnrollmentsRepository,
} from '../enrollments-repository'

export class PrismaEnrollmentsRepository implements EnrollmentsRepository {
  async findByUserIdAndCourseId(userId: string, courseId: string) {
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId,
        courseId,
      },
    })

    return enrollment
  }

  async create(data: CreateEnrollmentDTO) {
    const enrollment = await prisma.enrollment.create({
      data,
    })

    return enrollment
  }

  async findManyByUserId(userId: string) {
    const enrollmentsWithCourse = await prisma.enrollment.findMany({
      where: {
        userId,
      },
      include: {
        course: true,
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    })

    return enrollmentsWithCourse
  }
}
