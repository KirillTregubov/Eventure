import { StackNavigationProp } from '@react-navigation/stack'
import {
  Alert,
  Button,
  Text,
  TouchableHighlight,
  useColorScheme,
  View
} from 'react-native'
import { TrashIcon } from 'react-native-heroicons/solid'
import { CalendarIcon } from 'react-native-heroicons/outline'

import { NavigationParams } from '../lib/Navigation'
import Styles from '../lib/Styles'

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
        name: 'My Awesome Event',
        details: [
          {
            name: 'Interactive Map',
            type: 'link',
            link: 'https://'
          },
          {
            name: 'Our Website',
            type: 'link',
            link: 'https://'
          }
        ]
      }
    ],
    attendees: [{ username: 'johndoe', points: 20 }]
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
    <View
      style={{
        paddingTop: Styles.paddingTop.container,
        paddingHorizontal: Styles.paddingHorizontal.container
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
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

      {/* <Button title="Delete" /> */}
      <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>{}</Text>
      <Text
        style={{
          paddingTop: 12,
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Info provided by event
      </Text>
      <Button title="Interactive Map" />
      <Button title="Our Website" />
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
            Schedule an Event
          </Text>
        </View>
      </TouchableHighlight>
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
  )
}
