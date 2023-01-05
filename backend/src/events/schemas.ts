import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const Event = z.object({
  eventId: z.string().uuid(),
  eventName: z.string()
})

const CreateEventBody = Event.omit({ eventId: true })
export type CreateEventBody = z.infer<typeof CreateEventBody>

const CreateEventResponse = Event

export const { schemas: eventSchemas, $ref } = buildJsonSchemas(
  {
    CreateEventBody,
    CreateEventResponse
  },
  { $id: 'Events' }
)
