import Constants from 'expo-constants'
import { z } from 'zod'

const API_URL = Constants?.manifest?.extra?.API_URL

import { Event, Events } from './Schemas'

async function GET(
  url: string,
  signal: AbortController['signal'] | undefined,
  options: RequestInit,
  schema: z.ZodSchema,
  errorMessage: string
) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  const response = await fetch(new URL(url, API_URL), {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers
    },
    signal: signal ? signal : controller.signal
  })

  clearTimeout(timeout)
  if (!response.ok) {
    if (response.status === 401) {
      return new Error('Forbidden access')
    }
    return new Error(errorMessage)
  }

  const json = await response.json()
  const result = schema.safeParse(json)
  if (!result.success) {
    console.error('Zod validation error:', result.error)
    throw Error('Data validation error')
  }

  return result.data
}

export async function getAllEvents(
  signal: AbortController['signal'] | undefined
) {
  return GET(
    '/api/v1/events',
    signal,
    { method: 'GET' },
    Events,
    'Error getting all events'
  )
}

export async function getSingleEvent(
  signal: AbortController['signal'] | undefined,
  eventId: string
) {
  return GET(
    `/api/v1/events/${eventId}`,
    signal,
    { method: 'GET' },
    Event,
    'Error getting event'
  )
}

export async function getEventsPageData(
  signal: AbortController['signal'] | undefined
) {
  const events = await getAllEvents(signal)

  if (events instanceof Error) {
    throw events
  }
  return {
    events
  }
}
