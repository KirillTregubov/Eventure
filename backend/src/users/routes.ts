import { FastifyInstance, RegisterOptions, FastifyRequest } from 'fastify'
import { getUsers, createUser, getUser } from './controller'
import { DoneFunction } from 'lib/types'
import { $ref, CreateUserBody, GetUserParams } from './schemas'
import { $sharedRef } from 'lib/schemas'

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

  fastify.get(
    '/:userId',
    {
      schema: {
        tags: ['Users'],
        summary: 'Get user by ID',
        params: 
          {
            ...$ref('GetUserParams'),
            description: 'The ID of the user'
          },
        response: {
           200: {
            ...$ref('GetUserResponse'),
            description: 'One user'
          },
          500: {
            ...$sharedRef('InternalServerError'),
            description: 'Internal Server Error'
          }
        }
      }
    },
    async (req:FastifyRequest<{Params: GetUserParams}>, reply) => {
      const users = await getUser(fastify.prisma, req.params?.userId)
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
            description: 'User created'
          },
          400: { ...$sharedRef('BadRequest'), description: 'Bad Request' },
          500: {
            ...$sharedRef('InternalServerError'),
            description: 'Internal Server Error'
          }
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
