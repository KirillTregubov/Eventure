import { FastifyInstance, FastifyRequest, RegisterOptions } from 'fastify'
import {
  getOrganizations,
  createOrganization,
  getOrgEvents,
  getOrganizationsByUser
} from './controller'
import { DoneFunction } from '../lib/types'
import { $ref, CreateOrganizationBody, GetOrgEventsParams } from './schemas'
import { $sharedRef } from 'lib/schemas'
import type { GetUserParamsType } from 'users/schemas'

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
    '/user/:userId',
    {
      schema: {
        tags: ['Organizations'],
        summary: 'Get organizations by user',
        params: {
          ...$ref('GetUserParams'),
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
    async (req: FastifyRequest<{ Params: GetUserParamsType }>, reply) => {
      const organizations = await getOrganizationsByUser(
        fastify.prisma,
        req.params.userId
      )
      reply.send(organizations)
    }
  )

  // Want to get all events for a particular organization, using organization Id
  fastify.get(
    '/:organizationId',
    {
      schema: {
        tags: ['Organizations'],
        summary: 'Get all events for a particular organization',
        params: {
          ...$ref('GetOrgEventsParams'),
          description: 'The ID of the user'
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
      const organizations = await getOrgEvents(
        fastify.prisma,
        req.params.organizationId
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
