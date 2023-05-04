import { StackNavigationProp } from '@react-navigation/stack'
import { useQuery } from '@tanstack/react-query'
import {
  RefreshControl,
  ScrollView,
  Text,
  useColorScheme,
  View
} from 'react-native'
// import { ChevronRightIcon } from 'react-native-heroicons/outline'

import { NavigationParams } from '../lib/Navigation'
import { Event } from '../lib/Schemas'
import Styles from '../lib/Styles'
import EventCard from '../components/EventCard'
import { UserData } from '../lib/Data'
import { getEventsPageData } from '../lib/Api'

const HomeScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<NavigationParams, 'Main'>
}) => {
  const scheme = useColorScheme()

  // const userData = {
  //   firstName: 'John',
  //   availablePrizes: {
  //     amount: 1,
  //     organization: 'LIVEROCK ENT'
  //   },
  //   rsvpEvents: []
  // }
  const userData = UserData
  const { status, data, error, refetch } = useQuery({
    queryKey: ['events-page'],
    queryFn: getEventsPageData
  })

  if (status === 'loading') {
    return <Text>Loading...</Text>
  }

  if (status === 'error') {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl onRefresh={refetch} />}
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
            position: 'relative',
            backgroundColor:
              scheme === 'dark'
                ? Styles.colors.indigo['900']
                : Styles.colors.indigo['200'],
            padding: 9,
            borderRadius: 5,
            elevation: 3
          }}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 2,
              color:
                scheme === 'dark'
                  ? Styles.colors.indigo['300']
                  : Styles.colors.indigo['700']
            }}>
            Welcome back,{' '}
            <Text
              style={{
                fontWeight: '700',
                color:
                  scheme === 'dark'
                    ? Styles.colors.indigo['100']
                    : Styles.colors.indigo['800']
              }}>
              {userData.firstName}
            </Text>
            !
          </Text>
          <Text
            style={{
              color:
                scheme === 'dark'
                  ? Styles.colors.indigo['300']
                  : Styles.colors.indigo['700'],
              width: '100%',
              overflow: 'hidden'
            }}>
            You have {userData.availablePrizes.amount} prize available from{' '}
            {userData.availablePrizes.organization}.{' '}
          </Text>
          {/* <ChevronRightIcon
            style={{ position: 'absolute', right: 5, top: '50%' }}
            size={14}
            color={
              scheme === 'dark'
                ? Styles.colors.indigo['300']
                : Styles.colors.indigo['700']
            }
          /> */}
        </View>
      </View>
      {/* <View style={{ paddingHorizontal: 18 }}>
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
        {userData.rsvpEvents.map((e, i) => (
          <EventCard navigation={navigation} event={SampleEvent} key={i} />
        ))}
      </View> */}
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
        {data.events.map((event: Event, index: number) => (
          <EventCard navigation={navigation} event={event} key={index} />
        ))}
      </View>
    </ScrollView>
  )
}

export default HomeScreen
