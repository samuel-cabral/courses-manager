import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'
import { createCourse } from '../routes/courses/create'
import { fetchCourses } from '../routes/courses/fetch'
import { createEnrollment } from '../routes/enrollments/create'
import { fetchUserEnrollments } from '../routes/enrollments/fetch-by-user'
import { fetchUsers } from '../routes/users/fetch'
import { getProfileRoute } from '../routes/users/get-profile'
import { getUser } from '../routes/users/get-user'

export async function authRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.register(getProfileRoute)
  app.register(getUser)
  app.register(fetchUsers)
  app.register(createCourse)
  app.register(fetchCourses)
  app.register(createEnrollment)
  app.register(fetchUserEnrollments)
}
