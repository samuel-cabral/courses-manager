import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'
import { createCourse } from '../routes/courses/create'
import { fetchCourses } from '../routes/courses/fetch'
import { createEnrollment } from '../routes/enrollments/create'
import { getUser } from '../routes/users/get-user'

export async function authRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.register(getUser)
  app.register(createCourse)
  app.register(fetchCourses)
  app.register(createEnrollment)
}
