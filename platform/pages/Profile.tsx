import { StackNavigationProp } from '@react-navigation/stack'
import { useLayoutEffect } from 'react'
import { Button, Platform, Text, useColorScheme, View } from 'react-native'
import { CogIcon } from 'react-native-heroicons/outline'

import { NavigationParams } from '../lib/Navigation'

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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: '100%',
          paddingTop: 10,
          paddingHorizontal: 18
        }}>
        <Text
          style={{
            fontSize: 18,
            color: scheme === 'dark' ? 'white' : 'black'
          }}>
          My Profile
        </Text>
        <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
          Points
        </Text>
        <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
          My organizations
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          width: '100%',
          paddingTop: 6,
          paddingHorizontal: 14,
          paddingBottom: 20
        }}>
        {[...Array(2)].map((e, i) => (
          <View
            style={{
              width: '50%',
              height: 100,
              padding: 4
            }}
            key={i}>
            <View
              style={{
                backgroundColor: scheme === 'dark' ? '#262626' : '#d4d4d4',
                width: '100%',
                height: '100%',
                borderRadius: 8
              }}></View>
          </View>
        ))}
      </View>
    </View>
  )
}
