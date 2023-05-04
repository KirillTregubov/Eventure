import { z } from 'zod'

export const Detail = z.object({
  name: z.string(),
  type: z.enum(['text', 'link']),
  content: z.string()
})

export type DetailType = z.infer<typeof Detail>

export const Event = z.object({
  eventId: z.string().uuid(),
  eventName: z.string(),
  greeting: z.string().optional(),
  eventType: z.enum(['ONLINE', 'INPERSON', 'HYBRID']),
  maxAttendees: z.number().optional(),
  price: z.number().optional(),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  pointsEarned: z.number().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  addressLatitude: z.number(),
  addressLongitude: z.number(),
  details: z.array(Detail)
})

export type EventType = z.infer<typeof Event>

export const Events = z.array(Event)
