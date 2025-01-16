import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'
import { createCourse } from '../routes/courses/create'
import { getUser } from '../routes/users/get-user'

export async function authRoutes(app: FastifyInstance) {
  // Aplica o middleware de autenticação em todas as rotas deste plugin
  app.addHook('onRequest', verifyJwt)

  app.register(getUser)
  app.register(createCourse)
}
