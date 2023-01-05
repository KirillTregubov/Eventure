import { FastifyInstance, RegisterOptions } from 'fastify'
import userRoutes from './users'
import eventRoutes from './events'
import organizationRoutes from './organizations'

export default function (
  fastify: FastifyInstance,
  opts: RegisterOptions,
  done: (err?: Error) => void
) {
  fastify.register(userRoutes, {
    prefix: '/users'
  })
  fastify.register(eventRoutes, { prefix: '/events' })
  fastify.register(organizationRoutes, { prefix: '/organizations' })
  done()
}
