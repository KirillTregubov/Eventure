import { Button, Text, useColorScheme, View } from 'react-native'

export default function Scan({ navigation }) {
  const scheme = useColorScheme()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
        Scan QR Code or Tap to Enter (NFC)
      </Text>
      <Button
        title="Attend Event"
        onPress={() =>
          navigation.navigate('EventPage', {
            name: 'My Awesome Event'
          })
        }></Button>
    </View>
  )
}
