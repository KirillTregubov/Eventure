import { FastifyInstance, RegisterOptions } from 'fastify'
import { getUsers, createUser } from './controller'
import { DoneFunction } from '../lib/types'

export default function (
  fastify: FastifyInstance,
  opts: RegisterOptions,
  done: DoneFunction
) {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['Users'],
        summary: 'Get all users'
        //   response: {
        //     200: {
        //       type:
        // }
      }
    },
    async (req, reply) => {
      const users = await getUsers(fastify.prisma)
      reply.send(users)
    }
  )

  fastify.post(
    '/',
    {
      schema: {
        tags: ['Users'],
        summary: 'Create a new user',
        body: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' }
          },
          required: ['username', 'firstName', 'lastName', 'email']
        }
      }
    },
    async (req, reply) => {
      const user = await createUser(fastify.prisma, req)
      reply.send(user)
    }
  )
  done()
}
