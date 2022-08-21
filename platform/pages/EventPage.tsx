import { useState } from 'react'
import { Button, Linking, Text, useColorScheme, View } from 'react-native'
import { CalendarIcon, ClockIcon } from 'react-native-heroicons/outline'
import MapView, { Marker } from 'react-native-maps'
import {
  AllEvents,
  CollegeTour,
  FriendlyEvent,
  Hackathon,
  MonthlyBarbecue,
  SampleEvent
} from '../lib/Data'
import Styles from '../lib/Styles'

type EventPageParams = {
  route: {
    params: {
      name: string
    }
  }
}

export default function EventPage({ route }: EventPageParams) {
  const scheme = useColorScheme()

  let eventData = null

  const goal = route.params.name
  console.log(goal)
  if (goal === 'Jack Morris Concert') eventData = SampleEvent
  else if (goal === 'My Friendly Get-Together') eventData = FriendlyEvent
  else if (goal === 'College Tour') eventData = CollegeTour
  else if (goal === 'Toronto Hackathon') eventData = Hackathon
  else if (goal === 'Smith Family August Barbecue') eventData = MonthlyBarbecue

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

  if (!eventData) {
    return <></>
  }

  return (
    <View
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
        {eventData.name}
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
            {eventData.startDate} - {eventData.endDate}
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
            {eventData.startTime} - {eventData.endTime}
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
          {eventData.pointsEarned}
        </Text>{' '}
        points earned
      </Text>
      <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
        {eventData.greeting}
      </Text>
      <Text
        style={{
          paddingTop: 12,
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Info provided by event
      </Text>
      {eventData.details.map((detail, index) => {
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
      })}
      <Text
        style={{
          paddingTop: 12,
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Map of Venue
      </Text>
      <MapView
        region={{
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
          ...eventData.address
        }}
        style={{
          backgroundColor: scheme === 'dark' ? '#262626' : '#d4d4d4',
          width: '100%',
          height: 250,
          borderRadius: 8,
          marginTop: 8
        }}>
        <Marker
          coordinate={eventData.address}
          title={'Event Location'}
          description={`Location of ${eventData.name}`}
        />
      </MapView>
    </View>
  )
}
