import { StackNavigationProp } from '@react-navigation/stack'
import { useQuery } from '@tanstack/react-query'
import {
  //   SafeAreaView,
  RefreshControl,
  ScrollView,
  Text,
  useColorScheme,
  View,
  ActivityIndicator
} from 'react-native'
import { useState } from 'react'
// import { ChevronRightIcon } from 'react-native-heroicons/outline'

import { NavigationParams } from '../lib/Navigation'
import { EventType } from '../lib/Schemas'
import Styles from '../lib/Styles'
import EventCard from '../components/EventCard'
import { UserData } from '../lib/Data'
import { getEventsPageData } from '../lib/Api'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<NavigationParams, 'Main'>
}) => {
  const scheme = useColorScheme()
  const [refreshing, setRefreshing] = useState(false)

  // const userData = {
  //   firstName: 'John',
  //   availablePrizes: {
  //     amount: 1,
  //     organization: 'LIVEROCK ENT'
  //   },
  //   rsvpEvents: []
  // }
  const userData = UserData
  const query = useQuery({
    queryKey: ['events-page'],
    queryFn: ({ signal }) => getEventsPageData(signal),
    retry: false
  })
  const { refetch } = query

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  if (!query.isSuccess) {
    return (
      <SafeAreaView
        style={{
          flex: 1
        }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentInsetAdjustmentBehavior={'automatic'}
          contentContainerStyle={{
            paddingTop: Styles.paddingTop.container,
            paddingHorizontal: Styles.paddingHorizontal.container
            // flexGrow: 1
            // minHeight: '100%'
            //   justifyContent: 'space-between'
          }}>
          {/* <Text
            style={{
              color: scheme === 'dark' ? 'white' : 'black'
            }}>
            Error
          </Text> */}
          {query.isLoading && !refreshing ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center'
              }}>
              <ActivityIndicator size="small" />
            </View>
          ) : (
            query.isError && (
              <Text
                style={{
                  color: scheme === 'dark' ? 'white' : 'black'
                }}>
                Error:{' '}
                {query.error instanceof Error
                  ? query.error.message
                  : 'Failed to load data'}
              </Text>
            )
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentInsetAdjustmentBehavior={'automatic'}
      style={{
        minHeight: '100%',
        height: '100%',
        width: '100%'
      }}>
      {userData.availablePrizes && (
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
      )}
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
        {query.data.events.map((event: EventType, index: number) => (
          <EventCard navigation={navigation} event={event} key={index} />
        ))}
      </View>
    </ScrollView>
  )
}

export default HomeScreen
