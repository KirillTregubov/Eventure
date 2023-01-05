import { FastifyInstance, RegisterOptions } from 'fastify'
import { getOrganizations, createOrganization } from 'controllers/organization'

export default function (
  fastify: FastifyInstance,
  opts: RegisterOptions,
  done: (err?: Error) => void
) {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['Organizations'],
        summary: 'Get all organizations'
      }
    },
    async (req, reply) => {
      const organizations = await getOrganizations(fastify.prisma)
      reply.send(organizations)
    }
  )

  fastify.post(
    '/',
    {
      schema: {
        tags: ['Organizations'],
        summary: 'Create an organization'
      }
    },
    async (req, reply) => {
      const event = await createOrganization(fastify.prisma, req)
      reply.send(event)
    }
  )

  done()
}
