import { Text, useColorScheme, View } from 'react-native'

export default function Settings() {
  const scheme = useColorScheme()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{ fontSize: 18, color: scheme === 'dark' ? 'white' : 'black' }}>
        Settings
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Stats (Points earned, events attended, organizations visited)
      </Text>
    </View>
  )
}
