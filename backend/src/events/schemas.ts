import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

export const Event = z.object({
  eventId: z.string().uuid(),
  eventName: z.string(),
  greeting: z.string().optional(),
  eventType: z.enum(['ONLINE', 'INPERSON', 'HYBRID']),
  maxAttendees: z.number(),
  price: z.number().optional(),
  startDate: z.date(),
  endDate: z.date(),
  pointsEarned: z.number().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  addressLatitude: z.number(),
  addressLongitude: z.number()
})

const CreateEventBody = Event.omit({ eventId: true }).extend({
  organizationId: z
    .string()
    .uuid()
    .default('76bda396-53bc-4c6d-a4c9-91987f006825')
})
export type CreateEventBody = z.infer<typeof CreateEventBody>

const CreateEventResponse = Event

const GetEventsResponse = z.array(
  Event.pick({ eventId: true, eventName: true })
)

export const { schemas: eventSchemas, $ref } = buildJsonSchemas(
  {
    CreateEventBody,
    CreateEventResponse,
    GetEventsResponse
  },
  { $id: 'Events' }
)
