import { FastifyInstance, RegisterOptions } from 'fastify'
import { createEvent } from './controller'
import { DoneFunction } from '../lib/types'

export default function (
  fastify: FastifyInstance,
  opts: RegisterOptions,
  done: DoneFunction
) {
  // fastify.get(
  //   '/',
  //   {
  //     // schema: {
  //     //   response: {
  //     //     200: {
  //     //       type:
  //     // }
  //   },
  //   async (req, reply) => {
  //     const users = await getUsers(fastify.prisma)
  //     reply.send(users)
  //   }
  // )

  fastify.post(
    '/',
    {
      schema: {
        tags: ['Events'],
        summary: 'Create a new event'
        // body: {
        //   type: 'object',
        //   properties: {
        //     username: { type: 'string' },
        //     firstName: { type: 'string' },
        //     lastName: { type: 'string' },
        //     email: { type: 'string' }
        //   }
        // }
      }
    },
    async (req, reply) => {
      const event = await createEvent(fastify.prisma, req)
      reply.send(event)
    }
  )

  done()
}
