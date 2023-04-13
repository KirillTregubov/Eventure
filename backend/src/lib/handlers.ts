import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import { HttpException } from 'lib/exceptions'

const errorHandler = (
  err: unknown,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  console.error(JSON.stringify(err))
  if (err && err instanceof HttpException) {
    console.log('detected as custom error')
    reply.status(err.errorCode).send(err)
  } else if (
    err &&
    typeof err === 'object' &&
    'code' in err &&
    typeof err.code === 'string' &&
    err.code?.startsWith('P')
  ) {
    // Prisma error
    reply.send(new Error('Something went wrong'))
  } else {
    reply.send(err)
  }
}

export default errorHandler
