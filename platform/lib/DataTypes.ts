import { EventType } from './Schemas'

export type Event = {
  name: string
  greeting: string
  pointsEarned: number
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  details: {
    name: string
    type: string
    content: string
  }[]
  address: {
    latitude: number
    longitude: number
  }
}

export interface User {
  firstName: string
  lastName: string
  username: string
  organizations: Array<{
    name: string
  }>
  availablePrizes?: {
    amount: number
    organization: string
  }
  rsvpEvents?: Array<EventType>
}
