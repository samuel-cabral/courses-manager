import { prisma } from '@/lib/prisma'

import type { CreateUserDTO, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  async create(data: CreateUserDTO) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
