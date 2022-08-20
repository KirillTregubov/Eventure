import { Button, Text, useColorScheme, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'

import { NavigationParams } from '../lib/Navigation'

type ScanProps = {
  navigation: StackNavigationProp<NavigationParams, 'Scan'>
}

export default function Scan({ navigation }: ScanProps) {
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
