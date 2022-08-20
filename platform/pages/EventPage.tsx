import { Button, Linking, Text, useColorScheme, View } from 'react-native'

type EventPageParams = {
  route: {
    params: {
      name: string
    }
  }
}

export default function EventPage({ route }: EventPageParams) {
  const scheme = useColorScheme()

  // fetch
  console.log(route.params.name)

  const eventData = {
    name: 'My Awesome Event',
    pointsEarned: 20,
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
    address: '123 Main St, Anytown, CA 12345'
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{
          fontSize: 18,
          paddingBottom: 2,
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Event: {eventData.name}
      </Text>
      <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
        Welcome to the Event! Enjoy your time here!
      </Text>
      <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
        Points Earned: {eventData.pointsEarned}
      </Text>
      <Text
        style={{
          paddingTop: 12,
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Info provided by event
      </Text>
      {eventData.details.map((detail, index) => {
        return (
          <View key={index}>
            {detail.type === 'text' && (
              <>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingTop: 12,
                    color: scheme === 'dark' ? 'white' : 'black'
                  }}>
                  {detail.name}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingTop: 2,
                    color: scheme === 'dark' ? 'white' : 'black'
                  }}>
                  {detail.content}
                </Text>
              </>
            )}
            {detail.type === 'link' && (
              <Button
                title={detail.name}
                onPress={() => {
                  Linking.openURL(detail.content)
                }}
              />
            )}
          </View>
        )
      })}
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
