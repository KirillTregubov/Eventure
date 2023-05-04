import Constants from 'expo-constants'

const API_URL = Constants?.manifest?.extra?.API_URL

import { Events } from './Schemas'

export async function getAllEventsRequest(
  signal: AbortController['signal'] | undefined
) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  const response = await fetch(new URL(`${API_URL}/api/v1/events`), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    signal: signal ? signal : controller.signal
  })
  clearTimeout(timeout)
  if (!response.ok) {
    if (response.status === 401) {
      return { error: 'Forbidden' } as {
        error: string
        token: undefined
      }
    }
    return new Error('Error getting all events')
  }
  const json = await response.json()

  const result = Events.safeParse(json)
  if (!result.success) {
    console.error('Zod validation error:', result.error)
    throw Error('Data validation error')
  }

  return result.data
}

export async function getEventsPageData() {
  const events = await getAllEventsRequest()
  return {
    events
  }
}
