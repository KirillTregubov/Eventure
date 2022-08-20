import { StackNavigationProp } from '@react-navigation/stack'
import {
  ScrollView,
  Text,
  TouchableHighlight,
  useColorScheme,
  View
} from 'react-native'
import { ChevronRightIcon } from 'react-native-heroicons/outline'

import { NavigationParams } from '../lib/Navigation'

function EventCard({
  navigation
}: {
  navigation: StackNavigationProp<NavigationParams>
}): JSX.Element {
  const scheme = useColorScheme()

  return (
    <View
      style={{
        width: '50%',
        height: 100,
        padding: 4
      }}>
      <TouchableHighlight
        onPress={() =>
          navigation.navigate('EventPage', { name: 'My Awesome Event' })
        }
        underlayColor={scheme === 'dark' ? '#525252' : '#737373'}
        style={{
          backgroundColor: scheme === 'dark' ? '#262626' : '#d4d4d4',
          width: '100%',
          height: '100%',
          borderRadius: 8,
          padding: 6,
          paddingHorizontal: 8
        }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 11,
              marginTop: 'auto',
              color: scheme === 'dark' ? '#737373' : 'black'
            }}>
            25 - 27 July, 2022
          </Text>
          <Text
            style={{
              fontWeight: '900',
              color: scheme === 'dark' ? 'white' : 'black'
              // consider using 'white' with image
            }}>
            Event Name
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const HomeScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<NavigationParams, 'Main'>
}) => {
  const scheme = useColorScheme()

  const userData = {
    firstName: 'John',
    availablePrizes: {
      amount: 1,
      organization: 'LIVEROCK ENT'
    },
    rsvpEvents: []
  }

  const allEvents = []

  return (
    <ScrollView
      contentInsetAdjustmentBehavior={'automatic'}
      style={{
        minHeight: '100%',
        height: '100%',
        width: '100%'
      }}>
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 18
        }}>
        <View
          style={{
            backgroundColor: scheme === 'dark' ? '#312e81' : '#a5b4fc',
            padding: 9,
            borderRadius: 4
          }}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 2,
              color: scheme === 'dark' ? '#a5b4fc' : '#3730a3'
            }}>
            Welcome back,{' '}
            <Text
              style={{
                fontWeight: '700',
                color: scheme === 'dark' ? '#e0e7ff' : '#312e81'
              }}>
              {userData.firstName}
            </Text>
            !
          </Text>
          <Text style={{ color: scheme === 'dark' ? '#a5b4fc' : '#3730a3' }}>
            You have {userData.availablePrizes.amount} prize available from{' '}
            {userData.availablePrizes.organization}.{' '}
            <View>
              <ChevronRightIcon
                size={12}
                color={scheme === 'dark' ? '#a5b4fc' : '#3730a3'}
              />
            </View>
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 18 }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 22,
            color: scheme === 'dark' ? 'white' : 'black'
          }}>
          RSVP&apos;d Events
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          width: '100%',
          paddingTop: 4,
          paddingHorizontal: 14,
          paddingBottom: 20
        }}>
        {[...Array(2)].map((e, i) => (
          <EventCard navigation={navigation} key={i} />
        ))}
      </View>
      <View style={{ paddingHorizontal: 18 }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 22,
            color: scheme === 'dark' ? 'white' : 'black'
          }}>
          Upcoming Events
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          width: '100%',
          paddingTop: 4,
          paddingHorizontal: 14,
          paddingBottom: 20
        }}>
        {[...Array(20)].map((e, i) => (
          <EventCard navigation={navigation} key={i} />
        ))}
      </View>
    </ScrollView>
  )
}

export default HomeScreen
