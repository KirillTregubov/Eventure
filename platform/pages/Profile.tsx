import { StackNavigationProp } from '@react-navigation/stack'
import { useLayoutEffect } from 'react'
import {
  Button,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableHighlight,
  useColorScheme,
  View
} from 'react-native'
import { CogIcon } from 'react-native-heroicons/outline'

import { NavigationParams } from '../lib/Navigation'

function OrganizationCard({
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
          navigation.navigate('OrganizationPage', {
            name: 'My Cool Organization'
          })
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
              marginTop: 'auto',
              fontWeight: '900',
              color: scheme === 'dark' ? 'white' : 'black'
              // consider using 'white' with image
            }}>
            Organization Name
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

type ProfileProps = {
  navigation: StackNavigationProp<NavigationParams, 'Profile'>
}

export default function Profile({ navigation }: ProfileProps) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return Platform.OS === 'android' ? (
          <Button
            onPress={() => navigation.navigate('Settings')}
            title="Settings"
            color="#6366f1"
          />
        ) : (
          <CogIcon size={24} onPress={() => navigation.navigate('Settings')} />
        )
      },
      headerRightContainerStyle: {
        width: '100%',
        paddingRight: 10,
        marginLeft: -10
      }
    })
  })

  const scheme = useColorScheme()

  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    organizations: [{}]
  }

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <View style={{ paddingTop: 12, height: 425 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}>
          <Image
            style={{
              width: '35%',
              height: 'auto',
              aspectRatio: 1,
              borderRadius: 100,
              marginBottom: 10
            }}
            source={require('../assets/demoProfile.jpg')}
          />
          <Text
            style={{
              fontSize: 22,
              marginBottom: 1,
              fontWeight: '500',
              color: scheme === 'dark' ? 'white' : 'black'
            }}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: scheme === 'dark' ? '#a3a3a3' : '#525252'
            }}>
            @{userData.username}
          </Text>
          <View
            style={{
              marginTop: 4,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center'
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                  color: scheme === 'dark' ? '#737373' : '#a3a3a3'
                }}>
                Points
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '800',
                  color: scheme === 'dark' ? 'white' : 'black'
                }}>
                1.2K
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center'
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                  color: scheme === 'dark' ? '#737373' : '#a3a3a3'
                }}>
                Events Attended
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '800',
                  color: scheme === 'dark' ? 'white' : 'black'
                }}>
                5
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ paddingTop: 16, paddingHorizontal: 18, paddingBottom: 4 }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 22,
              color: scheme === 'dark' ? 'white' : 'black'
            }}>
            My Organizations
          </Text>
        </View>
        <View style={{ height: 105, marginBottom: 2 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            style={{ marginHorizontal: 14 }}>
            {userData.organizations.length > 0 ? (
              [...Array(2)].map((e, i) => (
                <OrganizationCard navigation={navigation} key={i} />
                // <View
                //   style={{
                //     width: 200,
                //     height: 100,
                //     padding: 4,
                //     marginBottom: 5
                //   }}
                //   key={i}>
                //   <View
                //     style={{
                //       backgroundColor:
                //         scheme === 'dark' ? '#262626' : '#d4d4d4',
                //       width: '100%',
                //       height: '100%',
                //       borderRadius: 8
                //     }}></View>
                // </View>
              ))
            ) : (
              <></>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}
