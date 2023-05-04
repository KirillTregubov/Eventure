import { z } from 'zod'

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

export type EventType = z.infer<typeof Event>

export const Events = z.array(Event)
