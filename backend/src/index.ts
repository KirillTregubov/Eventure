import * as dotenv from 'dotenv'
dotenv.config()
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}
import Fastify, { FastifyInstance, RegisterOptions } from 'fastify'
import fp from 'fastify-plugin'
import { withRefResolver } from 'fastify-zod'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { PrismaClient } from '@prisma/client'
import { version, repository } from '../package.json'
import routes from 'routes'
import errorHandler from 'lib/handlers'
import { DoneFunction } from 'lib/types'
import schemas from 'schemas'

declare module 'fastify' {
  interface FastifyRequest {
    prisma: PrismaClient
  }
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const fastify = Fastify()
const port: number = parseInt(process.env.PORT as string, 10) || 3000

fastify.register(helmet)
fastify.register(cors)
fastify.register(
  fp(
    async (
      fastify: FastifyInstance,
      opts: RegisterOptions,
      done: DoneFunction
    ) => {
      const prisma = new PrismaClient()
      try {
        await prisma.$connect()
      } catch (error) {
        console.error('Error connecting to database:', error)
        process.exit(1)
      }
      console.log('Connected to database.')
      fastify
        .decorate('prisma', prisma)
        .addHook('onClose', async (fastify, done) => {
          await fastify.prisma.$disconnect()
          done()
        })
      done()
    }
  )
)
schemas.forEach((schema) => {
  fastify.addSchema(schema)
})
fastify.register(
  swagger,
  withRefResolver({
    routePrefix: '/docs',
    exposeRoute: true,
    staticCSP: true,
    // Docs: https://swagger.io/specification/#openapi-object
    openapi: {
      info: {
        title: 'Eventure API',
        description: 'Eventure API documentation',
        version,
        license: {
          name: 'MIT'
        }
      },
      externalDocs: {
        url: repository.url,
        description: 'Open the GitHub repo'
      },
      tags: [
        { name: 'Users', description: 'User related endpoints' },
        { name: 'Events', description: 'Event related endpoints' },
        { name: 'Organizations', description: 'Organization related endpoints' }
      ]
    }
  })
)
fastify.register(swaggerUi, { routePrefix: '/docs' })
fastify.register(routes, { prefix: '/api/v1' })
fastify.setErrorHandler(errorHandler)
fastify.listen({ port: port }, () => {
  console.log(`Backend listening on port ${port}!`)
  fastify.swagger()
  console.log(`Documentation available at http://localhost:${port}/docs`)
})
