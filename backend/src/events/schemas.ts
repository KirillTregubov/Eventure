import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const Detail = z.object({
  detailId: z.string().uuid(),
  detailName: z.string(),
  detailType: z.enum(['TEXT', 'LINK']),
  content: z.string(),
  eventId: z.string().uuid()
})

export const Event = z.object({
  eventId: z.string().uuid(),
  organizationId: z.string().uuid(),
  eventName: z.string(),
  greeting: z.string().optional(),
  eventType: z.enum(['ONLINE', 'INPERSON', 'HYBRID']),
  maxAttendees: z.number().optional(),
  price: z.number().optional(),
  pointsEarned: z.number().optional(),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  addressLatitude: z.number(),
  addressLongitude: z.number(),
  details: z.array(Detail)
})

export const GetEventParams = z.object({
  eventId: z.string().uuid()
})
export type GetEventParams = z.infer<typeof GetEventParams>

const GetEventResponse = Event

const CreateEventBody = Event.omit({ eventId: true, details: true })
export type CreateEventBody = z.infer<typeof CreateEventBody>

const CreateEventResponse = Event

const SimpleEvent = Event.pick({
  eventId: true,
  eventName: true,
  startDate: true,
  endDate: true
})

const GetEventsResponse = z.array(SimpleEvent)

export const { schemas: eventSchemas, $ref } = buildJsonSchemas(
  {
    GetEventParams,
    GetEventResponse,
    GetEventsResponse,
    CreateEventBody,
    CreateEventResponse
  },
  { $id: 'Events' }
)
