import * as dotenv from 'dotenv'
dotenv.config()
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { PrismaClient } from '@prisma/client'
import { version, repository } from '../package.json'
// import prisma from "models/prisma.model";
import routes from 'routes/routes'
import errorHandler from 'lib/handlers'

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// const app = express();
declare module 'fastify' {
  interface FastifyRequest {
    prisma: PrismaClient
  }
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const fastify = Fastify({
  // logger: true
})
const port: number = parseInt(process.env.PORT as string, 10) || 3000

import fp from 'fastify-plugin'
import { FastifyInstance, RegisterOptions } from 'fastify'
import { withRefResolver } from 'fastify-zod'

fastify.register(helmet)
fastify.register(cors)
fastify.register(
  fp(
    async (
      fastify: FastifyInstance,
      opts: RegisterOptions,
      done: (err?: Error) => void
    ) => {
      const prisma = new PrismaClient()
      await prisma.$connect()
      console.log('connected')
      fastify
        .decorate('prisma', prisma)
        .decorateRequest('prisma', { getter: () => fastify.prisma })
        .addHook('onClose', async (fastify, done) => {
          await fastify.prisma.$disconnect()
          console.log('disconnected')
          done()
        })

      done()
    }
  )
)
fastify.register(
  swagger,
  withRefResolver({
    routePrefix: '/docs',
    exposeRoute: true,
    // swagger: {
    //   info: {
    //     title: 'Test swagger',
    //     description: 'Testing the Fastify swagger API',
    //     version
    //   },
    //   externalDocs: {
    //     url: 'https://swagger.io',
    //     description: 'Find more info here'
    //   },
    //   host: 'localhost:3000',
    //   // schemes: ['https'],
    //   consumes: ['application/json'],
    //   produces: ['application/json'],
    //   tags: [
    //     { name: 'Users', description: '' },
    //     { name: 'code', description: 'Code related end-points' }
    //   ]
    //   // definitions: {
    //   //   User: {
    //   //     type: 'object',
    //   //     required: ['id', 'email'],
    //   //     properties: {
    //   //       id: { type: 'string', format: 'uuid' },
    //   //       firstName: { type: 'string' },
    //   //       lastName: { type: 'string' },
    //   //       email: { type: 'string', format: 'email' }
    //   //     }
    //   //   }
    //   // },
    //   // securityDefinitions: {
    //   //   apiKey: {
    //   //     type: 'apiKey',
    //   //     name: 'apiKey',
    //   //     in: 'header'
    //   //   }
    //   // }
    // }
    // staticCSP: true,
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
      // host: 'localhost:3000',
      // schemes: ['https'],
      // consumes: ['application/json'],
      // produces: ['application/json'],
      tags: [
        { name: 'Users', description: 'User related endpoints' },
        { name: 'Events', description: 'Event related endpoints' },
        { name: 'Organizations', description: 'Organization related endpoints' }
      ]
    }
  })
)
fastify.register(swaggerUi, {
  routePrefix: '/docs'
  // swagger: {
  //   url: '/docs/swagger.json'
  // }
})
fastify.register(routes, { prefix: '/api/v1' })
fastify.setErrorHandler(errorHandler)
fastify.listen(
  {
    port: port
  },
  () => {
    console.log(`Backend listening on port ${port}!`)
    fastify.swagger()
  }
)
