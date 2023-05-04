import { User } from './DataTypes'
import { EventType } from './Schemas'

export const FriendlyEvent: EventType = {
  eventId: '93ebd3f6-eacc-11ed-a05b-0242ac120003',
  eventName: 'My Friendly Get-Together',
  greeting:
    'Welcome to our hang! Free food and drink for everyone. We will have a great time!',
  eventType: 'ONLINE',
  pointsEarned: 5,
  startDate: new Date('2022-08-10'),
  endDate: new Date('2022-08-11'),
  startTime: '3:00 p.m.',
  endTime: '4:00 a.m.',
  details: [
    {
      name: 'BYOB',
      type: 'text',
      content: 'You know what it means.'
    }
  ],
  addressLatitude: 43.792267761,
  addressLongitude: -79.6648835
}

export const CollegeTour: EventType = {
  eventId: 'e6cfa3d2-eacb-11ed-a05b-0242ac120003',
  eventName: 'College Tour',
  greeting: 'Welcome to a tour of our campus!',
  eventType: 'ONLINE',
  pointsEarned: 40,
  startDate: new Date('2022-07-25'),
  endDate: new Date('2022-07-25'),
  startTime: '1:00 p.m.',
  endTime: '3:00 p.m.',
  details: [
    {
      name: 'No Drinking Policy',
      type: 'text',
      content: 'No drinking on the premises.'
    },
    {
      name: 'Stick With Your Group',
      type: 'text',
      content: 'Please stick with your group to avoid getting lost.'
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
  addressLatitude: 37.78825,
  addressLongitude: -122.4324
}

export const Hackathon: EventType = {
  eventId: 'e6cfa3d2-eacb-11ed-a05b-0242ac120003',
  eventName: 'Toronto Hackathon',
  greeting:
    'Welcome everyone to this wonderful opertunity to expand your skilset and add experince to your resumes!',
  eventType: 'ONLINE',
  pointsEarned: 40,
  startDate: new Date('2022-07-24'),
  endDate: new Date('2022-07-29'),
  startTime: '6:00 p.m.',
  endTime: '10:0 a.m.',
  details: [
    {
      name: 'RULES',
      type: 'text',
      content: 'Ages 13+ only, Limited to Canadian Residents'
    },
    {
      name: 'Event Platform',
      type: 'text',
      content: 'In-person'
    },
    {
      name: 'Interactive Map',
      type: 'link',
      content: 'https://google.com'
    },
    {
      name: 'Our Website',
      type: 'link',
      content: 'https://devpost.com/'
    }
  ],
  addressLatitude: 43.792267761,
  addressLongitude: -79.6648835
}

export const SampleEvent: EventType = {
  eventId: 'e6cfa3d2-eacb-11ed-a05b-0242ac120003',
  eventName: 'Jack Morris Concert',
  greeting:
    'Welcome to the concert! The artist has a meet-and-greet after the show!',
  eventType: 'ONLINE',
  pointsEarned: 20,
  startDate: new Date('2022-07-25'),
  endDate: new Date('2022-07-27'),
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
  addressLatitude: 37.78825,
  addressLongitude: -122.4324
}

export const MonthlyBarbecue: EventType = {
  eventId: 'e08d515e-eacb-11ed-a05b-0242ac120003',
  eventName: 'Smith Family August Barbecue',
  greeting:
    'The Smith family welcomes you to our monthly barbecue. Stop by and have a burger or hot dog on us.',
  eventType: 'ONLINE',
  pointsEarned: 10,
  startDate: new Date('2022-07-27'),
  endDate: new Date('2022-07-29'),
  startTime: '2:00 p.m.',
  endTime: '6:00 p.m.',
  details: [
    {
      name: 'Must be a Neightbour Policy',
      type: 'text',
      content: 'Outside guests are not welcome on the premises'
    },
    {
      name: 'Swimming Pool Open for Event!',
      type: 'text',
      content:
        'Our swimming pool will be open to all of our neightbours to use and enjoy.'
    }
  ],
  addressLatitude: 43.792267761,
  addressLongitude: -79.6648835
}

export const AllEvents = [
  SampleEvent,
  FriendlyEvent,
  CollegeTour,
  Hackathon,
  MonthlyBarbecue
]

//current organization
export const organizationData = {
  name: 'Toronto Community Board',
  events: [
    {
      name: 'Jack Morris Concert'
      // dates
    },
    {
      name: 'Toronto Hackathon'
      // dates
    }
  ],
  //all of its events
  attendees: [
    { username: 'johnsmith', points: 200 },
    { username: 'alicebreck', points: 150 }
  ]
}

export const smithFamilyOrganizationData = {
  name: 'Smith Family',
  events: [
    {
      name: 'Smith Family August Barbecue'
      // dates
    }
  ],
  //all of its events
  attendees: [
    { username: 'johnsmith', points: 200 },
    { username: 'supercoollawyer', points: 30 }
  ]
}

//current User
export const UserData: User = {
  firstName: 'John',
  lastName: 'Smith',
  username: 'johnsmith',
  organizations: [
    {
      name: 'Smith Family'
    }
  ],
  availablePrizes: {
    amount: 1,
    organization: 'Smith Family'
  },
  rsvpEvents: [SampleEvent]
}

export const otherUserData: User = {
  firstName: 'Mike',
  lastName: 'Ross',
  username: 'supercoollawyer',
  organizations: [
    {
      name: 'Toronto Community Board'
    }
  ],
  availablePrizes: {
    amount: 1,
    organization: 'Toronto Community Board'
  },
  rsvpEvents: [MonthlyBarbecue, Hackathon]
}
