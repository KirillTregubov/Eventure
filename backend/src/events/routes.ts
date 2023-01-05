import { FastifyRequest, FastifyInstance, RegisterOptions } from 'fastify'
import { createEvent } from './controller'
import { DoneFunction } from '../lib/types'
import { $ref, CreateEventBody } from './schemas'
import { $sharedRef } from 'lib/schemas'

export default function (
  fastify: FastifyInstance,
  opts: RegisterOptions,
  done: DoneFunction
) {
  fastify.post(
    '/',
    {
      schema: {
        tags: ['Events'],
        summary: 'Create a new event',
        body: $ref('CreateEventBody'),
        response: {
          200: {
            ...$ref('CreateEventResponse'),
            description: 'Event created'
          },
          400: { ...$sharedRef('BadRequest'), description: 'Bad Request' },
          500: {
            ...$sharedRef('InternalServerError'),
            description: 'Internal Server Error'
          }
        }
      }
    },
    async (req: FastifyRequest<{ Body: CreateEventBody }>, reply) => {
      const event = await createEvent(fastify.prisma, req.body)
      reply.send(event)
    }
  )

  done()
}
