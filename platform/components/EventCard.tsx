import { Text, useColorScheme, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { Event } from '../lib/DataTypes'
import Styles from '../lib/Styles'

export default function EventCard({
  navigation,
  event
}: {
  navigation: StackNavigationProp<NavigationParams>
  event: Event
}): JSX.Element {
  const scheme = useColorScheme()

  return (
    <View
      style={{
        width: '50%',
        height: 120,
        padding: 4
      }}>
      <TouchableHighlight
        onPress={() => navigation.navigate('EventPage', { name: event.name })}
        underlayColor={
          scheme === 'dark'
            ? Styles.colors.neutral['600']
            : Styles.colors.neutral['500']
        }
        style={{
          backgroundColor:
            scheme === 'dark'
              ? Styles.colors.neutral['800']
              : Styles.colors.neutral['200'],
          width: '100%',
          height: '100%',
          borderRadius: 8,
          padding: 6,
          paddingHorizontal: 8,
          elevation: 3
        }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 12,
              marginTop: 'auto',
              color:
                scheme === 'dark'
                  ? Styles.colors.neutral['400']
                  : Styles.colors.neutral['600']
            }}>
            {event.startDate} - {event.endDate}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '900',
              color: scheme === 'dark' ? 'white' : 'black'
              // consider using 'white' with image
            }}>
            {event.name}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}
