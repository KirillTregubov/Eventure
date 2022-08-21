import { Button, Linking, Text, useColorScheme, View } from 'react-native'
import { CalendarIcon, ClockIcon } from 'react-native-heroicons/outline'
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

  // fetch
  console.log(route.params.name)

  const eventData = {
    name: 'My Awesome Event',
    pointsEarned: 20,
    startDate: '25',
    endDate: '27 July, 2022',
    startTime: '1:00 p.m.',
    endTime: '7:00 p.m.',
    details: [
      {
        name: 'No Drinking Policy',
        type: 'text',
        content: 'No drinking on the premises.'
      },
      {
        name: 'Interactive Map',
        type: 'link',
        content: 'https://google.com'
      },
      {
        name: 'Our Website',
        type: 'link',
        content: 'https://google.com'
      }
    ],
    address: '123 Main St, Anytown, CA 12345'
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{
          fontSize: 18,
          paddingBottom: 2,
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Event: {eventData.name}
      </Text>
      <View
        style={{
          marginTop: 12,
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
            {organizationData.startDate} - {organizationData.endDate}
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
            {organizationData.startTime} - {organizationData.endTime}
          </Text>
        </View>
      </View>
      <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
        Welcome to the Event! Enjoy your time here!
      </Text>
      <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
        Points Earned: {eventData.pointsEarned}
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
      <View
        style={{
          backgroundColor: scheme === 'dark' ? '#262626' : '#d4d4d4',
          width: '80%',
          height: 200,
          borderRadius: 8,
          marginTop: 8
        }}
      />
    </View>
  )
}
