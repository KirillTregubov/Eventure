import { FastifyInstance, RegisterOptions, FastifyRequest } from 'fastify'
import { getUsers, createUser } from './controller'
import { DoneFunction } from 'lib/types'
import { $ref, CreateUserBody } from './schemas'
import { $sharedRef } from 'schemas'

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
        summary: 'Get all users',
        response: {
          200: {
            ...$ref('GetUsersResponse'),
            description: 'List of users'
          },
          500: {
            ...$sharedRef('InternalServerError'),
            description: 'Internal Server Error'
          }
        }
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
        body: $ref('CreateUserBody'),
        response: {
          200: {
            ...$ref('CreateUserResponse'),
            description: 'User Created'
          },
          400: { ...$sharedRef('BadRequest'), description: 'Bad Request' }
        }
      }
    },
    async (req: FastifyRequest<{ Body: CreateUserBody }>, reply) => {
      const user = await createUser(fastify.prisma, req.body)
      reply.send(user)
    }
  )
  done()
}
