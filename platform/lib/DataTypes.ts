export type Event = {
  name: string
  greeting: string
  pointsEarned: number
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  details: [
    {
      name: string
      type: 'link' | 'text'
      content: string
    }
  ]
  address: {
    latitude: number
    longitude: number
  }
}
