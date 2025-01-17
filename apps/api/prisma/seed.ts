import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
const prisma = new PrismaClient()

async function seed() {
  try {
    console.log('🗑️ Limpando banco de dados...')
    await prisma.$transaction([
      prisma.enrollment.deleteMany(),
      prisma.course.deleteMany(),
      prisma.user.deleteMany(),
    ])

    console.log('👤 Criando usuários...')
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: faker.image.avatarGitHub(),
        passwordHash: await hash('123456', 1),
      },
    })

    const anotherUser = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        avatarUrl: faker.image.avatarGitHub(),
        passwordHash: await hash('123456', 1),
      },
    })

    const yetAnotherUser = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        avatarUrl: faker.image.avatarGitHub(),
        passwordHash: await hash('123456', 1),
      },
    })

    const course = await prisma.course.create({
      data: {
        title: 'React Native',
        description: faker.lorem.paragraph(),
        hours: 10,
      },
    })

    const anotherCourse = await prisma.course.create({
      data: {
        title: 'Node.js',
        description: faker.lorem.paragraph(),
        hours: 10,
      },
    })

    const yetAnotherCourse = await prisma.course.create({
      data: {
        title: 'Next.js',
        description: faker.lorem.paragraph(),
        hours: 10,
      },
    })

    await prisma.enrollment.createMany({
      data: [
        {
          userId: user.id,
          courseId: course.id,
        },
        {
          userId: anotherUser.id,
          courseId: anotherCourse.id,
        },
        {
          userId: yetAnotherUser.id,
          courseId: yetAnotherCourse.id,
        },
      ],
    })

    console.log('✅ Banco de dados populado com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed().catch((error) => {
  console.error(error)
})
