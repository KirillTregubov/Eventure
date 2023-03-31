import { FastifyInstance, FastifyRequest, RegisterOptions } from 'fastify'
import {
  getOrganizations,
  createOrganization,
  getOrganizationsByUser,
  getOrganizationById,
  getAttendeesByOrgId
} from './controller'
import { DoneFunction } from '../lib/types'
import {
  $ref,
  CreateOrganizationBody,
  GetOrganizationsByUserParams,
  GetOrgEventsParams,
  GetOrgAttendeesParams
} from './schemas'
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
        tags: ['Organizations'],
        summary: 'Get all organizations',
        response: {
          200: {
            ...$ref('GetOrganizationsResponse'),
            description: 'List of organizations'
          },
          500: {
            ...$sharedRef('InternalServerError'),
            description: 'Internal Server Error'
          }
        }
      }
    },
    async (req, reply) => {
      const organizations = await getOrganizations(fastify.prisma)
      reply.send(organizations)
    }
  )

  fastify.get(
    '/:organizationId',
    {
      schema: {
        tags: ['Organizations'],
        summary:
          'Get all events for a particular organization by organizationId',
        params: {
          ...$ref('GetOrgEventsParams'),
          description: 'The ID of the organization'
        },
        response: {
          200: {
            ...$ref('GetOrgEventsResponse'),
            description: 'List of events for organization'
          },
          500: {
            ...$sharedRef('InternalServerError'),
            description: 'Internal Server Error'
          }
        }
      }
    },
    async (req: FastifyRequest<{ Params: GetOrgEventsParams }>, reply) => {
      const organizations = await getOrganizationById(
        fastify.prisma,
        req.params.organizationId
      )
      reply.send(organizations)
    }
  )

  fastify.get(
    '/attendees/:organizationId',
    {
      schema: {
        tags: ['Organizations'],
        summary: 'Get top attendees for organization by organizationId',
        params: {
          ...$ref('GetOrgAttendeesParams'),
          description: 'The ID of the organization'
        },
        response: {
          200: {
            ...$ref('GetOrgAttendeesResponse'),
            description: 'List of top attendees for a particular organization'
          },
          500: {
            ...$sharedRef('InternalServerError'),
            description: 'Internal Server Error'
          }
        }
      }
    },
    async (req: FastifyRequest<{ Params: GetOrgAttendeesParams }>, reply) => {
      const attendees = await getAttendeesByOrgId(
        fastify.prisma,
        req.params.organizationId
      )
      reply.send(attendees)
    }
  )

  fastify.get(
    '/user/:userId',
    {
      schema: {
        tags: ['Organizations'],
        summary: 'Get organizations of a user by userId',
        params: {
          ...$ref('GetOrganizationsByUserParams'),
          description: 'The ID of the user'
        },
        response: {
          200: {
            ...$ref('GetOrganizationsResponse'),
            description: 'List of organizations'
          },
          500: {
            ...$sharedRef('InternalServerError'),
            description: 'Internal Server Error'
          }
        }
      }
    },
    async (
      req: FastifyRequest<{ Params: GetOrganizationsByUserParams }>,
      reply
    ) => {
      const organizations = await getOrganizationsByUser(
        fastify.prisma,
        req.params.userId
      )
      reply.send(organizations)
    }
  )

  fastify.post(
    '/',
    {
      schema: {
        tags: ['Organizations'],
        summary: 'Create an organization',
        body: $ref('CreateOrganizationBody'),
        response: {
          200: {
            ...$ref('CreateOrganizationResponse'),
            description: 'Organization created'
          },
          400: { ...$sharedRef('BadRequest'), description: 'Bad Request' },
          500: {
            ...$sharedRef('InternalServerError'),
            description: 'Internal Server Error'
          }
        }
      }
    },
    async (req: FastifyRequest<{ Body: CreateOrganizationBody }>, reply) => {
      const event = await createOrganization(fastify.prisma, req.body)
      reply.send(event)
    }
  )

  done()
}
