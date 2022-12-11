import {
  Alert,
  ScrollView,
  Text,
  TouchableHighlight,
  useColorScheme,
  View
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { CalendarIcon, TrashIcon } from 'react-native-heroicons/solid'

import { NavigationParams } from '../lib/Navigation'
import Styles from '../lib/Styles'
import EventCard from '../components/EventCard'
import { SampleEvent } from '../lib/Data'

function AttendeeCard({
  attendee
}: {
  attendee: {
    username: string
    points: number
  }
}): JSX.Element {
  const scheme = useColorScheme()

  return (
    <View
      style={{
        padding: 4,
        width: '100%'
      }}>
      <View
        style={{
          backgroundColor:
            scheme === 'dark'
              ? Styles.colors.neutral['800']
              : Styles.colors.neutral['200'],
          width: '100%',
          borderRadius: 8,
          padding: 8,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'row'
        }}>
        <Text
          style={{
            textAlign: 'center',
            // marginTop: 'auto',
            fontWeight: '600',
            color: scheme === 'dark' ? 'white' : 'black'
            // consider using 'white' with image
          }}>
          @{attendee.username}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            // marginTop: 'auto',
            fontWeight: '500',
            color:
              scheme === 'dark'
                ? Styles.colors.neutral['300']
                : Styles.colors.neutral['700']
            // consider using 'white' with image
          }}>
          <Text style={{ fontWeight: '800' }}>{attendee.points}</Text> points
        </Text>
      </View>
    </View>
  )
}

type OrganizationPageParams = {
  navigation: StackNavigationProp<NavigationParams>
  route: {
    params: {
      name: string
    }
  }
}

export default function OrganizationPage({
  navigation,
  route
}: OrganizationPageParams) {
  const scheme = useColorScheme()

  // fetch
  console.log(route.params.name)
  const organizationData = {
    name: 'My Cool Organization',
    events: [
      {
        name: 'My Awesome Event'
        // dates
      }
    ],
    attendees: [
      { username: 'johndoe', points: 200 },
      { username: 'janedoe', points: 150 }
    ]
  }

  const deleteOrganization = () => {
    Alert.alert(
      'Delete Event',
      `Confirm deletion of the ${organizationData.name} organization`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            console.log('delete event')
          },
          style: 'destructive'
        }
      ]
    )
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior={'automatic'}>
      <View
        style={{
          paddingHorizontal: Styles.paddingHorizontal.container
        }}>
        <View style={{ paddingTop: 50 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: '700',
              paddingBottom: 2,
              color: scheme === 'dark' ? 'white' : 'black'
            }}>
            {organizationData.name}
          </Text>
        </View>
      </View>

      <View
        style={{
          paddingTop: 16,
          paddingBottom: 4,
          paddingHorizontal: Styles.paddingHorizontal.container
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 22,
            color: scheme === 'dark' ? 'white' : 'black'
          }}>
          Hosted Events
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          width: '100%',
          paddingTop: 4,
          paddingHorizontal: 14,
          paddingBottom: 8
        }}>
        {[...Array(4)].map((e, i) => (
          <EventCard navigation={navigation} event={SampleEvent} key={i} />
        ))}
      </View>
      <View
        style={{
          paddingBottom: 4,
          paddingHorizontal: Styles.paddingHorizontal.container
        }}>
        <TouchableHighlight
          onPress={() => navigation.navigate('CreateEvent')}
          underlayColor={
            scheme === 'dark'
              ? Styles.colors.indigo['600']
              : Styles.colors.indigo['500']
          }
          style={{
            marginTop: 8,
            elevation: 4,
            backgroundColor:
              scheme === 'dark'
                ? Styles.colors.indigo['900']
                : Styles.colors.indigo['300'],
            borderRadius: 10,
            padding: 10
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <CalendarIcon
              style={{ marginRight: 3 }}
              size={14}
              color={
                scheme === 'dark'
                  ? Styles.colors.indigo['200']
                  : Styles.colors.indigo['900']
              }
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '600',
                color:
                  scheme === 'dark'
                    ? Styles.colors.indigo['200']
                    : Styles.colors.indigo['900']
              }}>
              Schedule a New Event
            </Text>
          </View>
        </TouchableHighlight>
      </View>

      <View
        style={{
          paddingTop: 16,
          paddingBottom: 4,
          paddingHorizontal: Styles.paddingHorizontal.container
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 22,
            color: scheme === 'dark' ? 'white' : 'black'
          }}>
          Top Attendees
        </Text>
      </View>
      <View
        style={{
          // flexDirection: 'col',
          // flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingTop: 4,
          paddingHorizontal: 14,
          paddingBottom: 8
        }}>
        {organizationData.attendees.map((attendee, index) => (
          <AttendeeCard attendee={attendee} key={index} />
        ))}
      </View>

      <View
        style={{
          marginHorizontal: Styles.paddingHorizontal.container,
          paddingBottom: 20
        }}>
        <View style={{ paddingTop: 8 }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 22,
              color: scheme === 'dark' ? 'white' : 'black'
            }}>
            Management Options
          </Text>
        </View>
        <TouchableHighlight
          onPress={() => deleteOrganization()}
          underlayColor={
            scheme === 'dark'
              ? Styles.colors.red['600']
              : Styles.colors.red['400']
          }
          style={{
            marginTop: 8,
            elevation: 4,
            backgroundColor:
              scheme === 'dark'
                ? Styles.colors.red['700']
                : Styles.colors.red['500'],
            borderRadius: 10,
            padding: 10
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <TrashIcon
              style={{ marginRight: 3 }}
              size={14}
              color={
                scheme === 'dark'
                  ? Styles.colors.red['100']
                  : Styles.colors.red['50']
              }
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '600',
                color:
                  scheme === 'dark'
                    ? Styles.colors.red['100']
                    : Styles.colors.red['50']
              }}>
              Delete this Organization
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </ScrollView>
  )
}
