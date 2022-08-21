export const FriendlyEvent = {
  name: 'My Friendly Get-Together',
  greeting:
    'Welcome to our hang! Free food and drink for everyone. We will have a great time!',
  pointsEarned: 5,
  startDate: '10',
  endDate: '11 August, 2022',
  startTime: '3:00 p.m.',
  endTime: '4:00 a.m.',
  details: [
    {
      name: 'BYOB',
      type: 'text',
      content: 'You know what it means.'
    }
  ],
  address: {
    longitude: 43.66760016,
    latitude: -79.4125619
  }
}

export const CollegeTour = {
  name: 'College Tour',
  greeting: 'Welcome to a tour of our campus!',
  pointsEarned: 40,
  startDate: '25 July, 2022',
  endDate: '25 July, 2022',
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
  address: {
    latitude: 37.78825,
    longitude: -122.4324
  }
}

export const Hackathon = {
  name: 'Toronto Hackathon',
  greeting:
    'Welcome everyone to this wonderful opertunity to expand your skilset and add experince to your resumes!',
  pointsEarned: 40,
  startDate: '24',
  endDate: '29 July, 2022',
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
  address: {
    latitude: 43.642567,
    longitude: -79.387054
  }
}

export const SampleEvent = {
  name: 'Jack Morris Concert',
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

export const MonthlyBarbecue = {
  name: 'Smith Family August Barbecue',
  greeting:
    'The Smith family welcomes you to our monthly barbecue. Stop by and have a burger or hot dog on us.',
  pointsEarned: 10,
  startDate: '29',
  endDate: '29 July, 2022',
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
  address: {
    latitude: 43.792267761,
    longitude: -79.6648835
  }
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
export const UserData = {
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

export const otherUserData = {
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
