import { Button, Text, useColorScheme, View } from 'react-native'

type OrganizationPageParams = {
  route: {
    params: {
      name: string
    }
  }
}

export default function OrganizationPage({ route }: OrganizationPageParams) {
  const scheme = useColorScheme()

  // fetch
  console.log(route.params.name)

  const organizationData = {
    name: 'My Cool Organization',
    events: [
      {
        name: 'My Awesome Event',
        details: [
          {
            name: 'Interactive Map',
            type: 'link',
            link: 'https://'
          },
          {
            name: 'Our Website',
            type: 'link',
            link: 'https://'
          }
        ]
      }
    ],
    attendees: [{ username: 'johndoe', points: 20 }]
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{
          fontSize: 18,
          paddingBottom: 2,
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Organization name: {organizationData.name}
      </Text>
      <Button title="Delete" />
      <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
        Points Earned: 20
      </Text>
      <Text
        style={{
          paddingTop: 12,
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Info provided by event
      </Text>
      <Button title="Interactive Map" />
      <Button title="Our Website" />
      <Text
        style={{
          paddingTop: 12,
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Map of Venue
      </Text>
      <View
        style={{
          backgroundColor: scheme === 'dark' ? '#262626' : '#d4d4d4',
          width: '80%',
          height: 200,
          borderRadius: 8,
          marginTop: 8
        }}
      />
    </View>
  )
}
