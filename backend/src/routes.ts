import { FastifyInstance, RegisterOptions } from 'fastify'
import { DoneFunction } from 'lib/types'
import userRoutes from 'users/routes'
import eventRoutes from 'events/routes'
import organizationRoutes from 'organizations/routes'

export default function (
  fastify: FastifyInstance,
  opts: RegisterOptions,
  done: DoneFunction
) {
  fastify.register(userRoutes, { prefix: '/users' })
  fastify.register(eventRoutes, { prefix: '/events' })
  fastify.register(organizationRoutes, { prefix: '/organizations' })

  done()
}
