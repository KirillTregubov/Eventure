import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const BadRequest = z.object({
  statusCode: z.literal(400),
  error: z.literal('Bad Request'),
  message: z.string()
})

const InternalServerError = z.object({
  statusCode: z.literal(500),
  error: z.literal('Internal Server Error'),
  message: z.string()
})

export const { schemas: sharedSchemas, $ref: $sharedRef } = buildJsonSchemas(
  { BadRequest, InternalServerError },
  { $id: 'Shared' }
)
