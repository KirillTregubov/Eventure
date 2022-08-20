import { Button, Text, useColorScheme, View } from 'react-native'

export default function EventPage({ route }) {
  const scheme = useColorScheme()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{
          fontSize: 18,
          paddingBottom: 2,
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Event: {route.params.name}
      </Text>
      <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
        Welcome to the Event! Enjoy your time here!
      </Text>
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
