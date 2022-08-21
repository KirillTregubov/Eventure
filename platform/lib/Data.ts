export const SampleEvent = {
  name: 'My Awesome Event',
  greeting:
    'Welcome to the concert! The artist has a meet-and-greet after the show!',
  pointsEarned: 20,
  startDate: '25',
  endDate: '27 July, 2022',
  startTime: '1:00 p.m.',
  endTime: '7:00 p.m.',
  details: [
    {
      name: 'No Drinking Policy',
      type: 'text',
      content: 'No drinking on the premises.'
    },
    {
      name: 'Interactive Map',
      type: 'link',
      content: 'https://google.com'
    },
    {
      name: 'Our Website',
      type: 'link',
      content: 'https://google.com'
    }
  ],
  address: {
    latitude: 37.78825,
    longitude: -122.4324
  }
}
