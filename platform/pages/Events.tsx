import { ScrollView, Text, useColorScheme, View } from 'react-native'

const HomeScreen = () => {
  const scheme = useColorScheme()

  return (
    <ScrollView
      contentInsetAdjustmentBehavior={'automatic'}
      style={{
        maxHeight: '100%',
        height: '100%',
        width: '100%',
        color: 'white'
      }}>
      <View
        style={{
          paddingVertical: 10,
          paddingBottom: 24,
          paddingHorizontal: 18
        }}>
        <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
          Welcome back, John
        </Text>
        <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
          You have 1 prize available from LIVEROCK ENT.
        </Text>
        <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
          List of upcoming events
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          width: '100%',
          paddingTop: 6,
          paddingHorizontal: 14,
          paddingBottom: 20
        }}>
        {[...Array(20)].map((e, i) => (
          <View
            style={{
              width: '50%',
              height: 100,
              padding: 4
            }}
            key={i}>
            <View
              style={{
                backgroundColor: scheme === 'dark' ? '#262626' : '#d4d4d4',
                width: '100%',
                height: '100%',
                borderRadius: 8
              }}></View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default HomeScreen
