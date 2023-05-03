// type SampleEvent = {
//   name: string
//   greeting: string
//   pointsEarned: number
//   startDate: string
//   endDate: string
//   startTime: string
//   endTime: string
//   details: [
//     {
//       name: string
//       type: string
//       content: string
//     }
//   ]
//   address: {
//     latitude: number
//     longitude: number
//   }
// }

export async function getAllEventsRequest(
  //   returnSchema: {
  //     firstName: string
  //     lastName: string
  //     username: string
  //     organizations: [
  //       {
  //         name: string
  //       }
  //     ]
  //     availablePrizes: {
  //       amount: number
  //       organization: string
  //     }
  //     rsvpEvents: [SampleEvent]
  //   },
  signal: AbortController['signal'] | undefined,
  error: Error
) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  const response = await fetch('https://localhost:3000//api/v1/events', {
    method: 'GET',
    headers: {
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
    // createStatusBreadcrumb(response.status)
    throw error
  }
  const json = await response.json()

  //   const validationResult = returnSchema.safeParse(json)
  //   if (!validationResult.success) {
  //     console.error('Zod validation error:', validationResult.error)
  //     throw Error('Data validation error')
  //   }

  return json
}
