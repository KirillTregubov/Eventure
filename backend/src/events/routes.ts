import { FastifyRequest, FastifyInstance, RegisterOptions } from 'fastify'
import { createEvent, getEvents, getEventById } from './controller'
import { DoneFunction } from '../lib/types'
import { $ref, CreateEventBody, GetEventParams } from './schemas'
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
        tags: ['Events'],
        // Right now, it gets all events in the database, but since there can be lots of events in database,
        // want to create algorithm to prioritize certain events, such as starting soon or ones with the most points
        summary: 'Get all events for homepage',
        response: {
          200: {
            ...$ref('GetEventsResponse'),
            description: 'List of events'
          },
          500: {
            ...$sharedRef('InternalServerError'),
            description: 'Internal Server Error'
          }
        }
      }
    },
    async (req, reply) => {
      const events = await getEvents(fastify.prisma)
      reply.send(events)
    }
  )

  fastify.get(
    '/:eventId',
    {
      schema: {
        tags: ['Events'],
        summary: 'Get all event data by its ID',
        params: {
          ...$ref('GetEventParams'),
          description: 'The ID of the event'
        },
        response: {
          200: {
            ...$ref('GetEventResponse'),
            description: 'One event'
          },
          500: {
            ...$sharedRef('InternalServerError'),
            description: 'Internal Server Error'
          }
        }
      }
    },
    async (req: FastifyRequest<{ Params: GetEventParams }>, reply) => {
      const event = await getEventById(fastify.prisma, req.params.eventId)
      reply.send(event)
    }
  )

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
