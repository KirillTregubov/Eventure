import { useState } from 'react'
import {
  ActivityIndicator,
  //   Button,
  //   Linking,
  Text,
  useColorScheme,
  View
} from 'react-native'
import { CalendarIcon, ClockIcon } from 'react-native-heroicons/outline'
import MapView, { Marker } from 'react-native-maps'
// import {
//   //   AllEvents,
//   //   CollegeTour,
//   //   FriendlyEvent,
//   //   Hackathon,
//   //   MonthlyBarbecue,
//   SampleEvent
// } from '../lib/Data'
import Styles from '../lib/Styles'
import { formatDateRange } from '../lib/Utils'
import { getSingleEventRequest } from '../lib/Api'
import { useQuery } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'

type EventPageParams = {
  route: {
    params: {
      id: string
    }
  }
}

export default function EventPage({ route }: EventPageParams) {
  const scheme = useColorScheme()

  const id = route.params.id

  const [refreshing, setRefreshing] = useState(false)
  const query = useQuery({
    queryKey: ['event-page'],
    queryFn: ({ signal }) => getSingleEventRequest(signal, id),
    retry: false
  })
  const { refetch } = query

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  //   const eventData = SampleEvent
  //   const goal = route.params.name
  //   console.log(goal)
  //   if (goal === 'Jack Morris Concert') eventData = SampleEvent
  //   else if (goal === 'My Friendly Get-Together') eventData = FriendlyEvent
  //   else if (goal === 'College Tour') eventData = CollegeTour
  //   else if (goal === 'Toronto Hackathon') eventData = Hackathon
  //   else if (goal === 'Smith Family August Barbecue') eventData = MonthlyBarbecue

  // const eventData = {
  //   name: 'My Awesome Event',
  //   greeting:
  //     'Welcome to the concert! The artist has a meet-and-greet after the show!',
  //   pointsEarned: 20,
  //   startDate: '25',
  //   endDate: '27 July, 2022',
  //   startTime: '1:00 p.m.',
  //   endTime: '7:00 p.m.',
  //   details: [
  //     {
  //       name: 'No Drinking Policy',
  //       type: 'text',
  //       content: 'No drinking on the premises.'
  //     },
  //     {
  //       name: 'Interactive Map',
  //       type: 'link',
  //       content: 'https://google.com'
  //     },
  //     {
  //       name: 'Our Website',
  //       type: 'link',
  //       content: 'https://google.com'
  //     }
  //   ],
  //   address: {
  //     latitude: 37.78825,
  //     longitude: -122.4324
  //   }
  // }

  // if (!eventData) {
  //   return <></>
  // }

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
    <View
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      style={{
        paddingTop: Styles.paddingTop.container,
        paddingHorizontal: Styles.paddingHorizontal.container
      }}>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 22,
          paddingBottom: 2,
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 22,
            paddingBottom: 2,
            color: scheme === 'dark' ? 'white' : 'black'
          }}>
          {query.data.eventName}
        </Text>
      </Text>
      <View
        style={{
          marginVertical: 12,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 'auto'
          }}>
          <CalendarIcon
            style={{ marginRight: 3 }}
            size={22}
            color={
              scheme === 'dark'
                ? Styles.colors.neutral['400']
                : Styles.colors.neutral['500']
            }
          />
          <Text
            style={{
              color:
                scheme === 'dark'
                  ? Styles.colors.neutral['400']
                  : Styles.colors.neutral['500']
            }}>
            {formatDateRange(query.data.startDate, query.data.endDate)}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 'auto'
          }}>
          <ClockIcon
            style={{ marginRight: 3 }}
            size={22}
            color={
              scheme === 'dark'
                ? Styles.colors.neutral['400']
                : Styles.colors.neutral['500']
            }
          />
          <Text
            style={{
              color:
                scheme === 'dark'
                  ? Styles.colors.neutral['400']
                  : Styles.colors.neutral['500']
            }}>
            {/* TODO: format */}
            {query.data.startTime} - {query.data.endTime}
          </Text>
        </View>
      </View>

      <Text
        style={{
          // marginTop: 'auto',
          marginBottom: 12,
          fontWeight: '500',
          color:
            scheme === 'dark'
              ? Styles.colors.neutral['400']
              : Styles.colors.neutral['500']
          // consider using 'white' with image
        }}>
        <Text
          style={{
            fontWeight: '800',
            color:
              scheme === 'dark'
                ? Styles.colors.neutral['300']
                : Styles.colors.neutral['600']
          }}>
          {query.data.pointsEarned || 0}
        </Text>{' '}
        points earned
      </Text>
      <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
        {query.data.greeting}
      </Text>
      <Text
        style={{
          paddingTop: 12,
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Info provided by event
      </Text>
      {/* TODO: add Expanded EventType with details */}
      {/* TODO: details completely broken */}
      {/* {eventData.details.map((detail: DetailType, index: number) => {
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
      })} */}
      <Text
        style={{
          paddingTop: 12,
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Map of Venue
      </Text>
      {/* TODO: delay render because it causes error */}
      <MapView
        region={{
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
          latitude: query.data.addressLatitude,
          longitude: query.data.addressLongitude
        }}
        style={{
          backgroundColor: scheme === 'dark' ? '#262626' : '#d4d4d4',
          width: '100%',
          height: 250,
          borderRadius: 8,
          marginTop: 8
        }}>
        <Marker
          coordinate={{
            latitude: query.data.addressLatitude,
            longitude: query.data.addressLongitude
          }}
          title={'Event Location'}
          description={`Location of ${query.data.eventName}`}
        />
      </MapView>
    </View>
  )
}
