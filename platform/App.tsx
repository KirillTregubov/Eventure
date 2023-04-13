import { StatusBar } from 'expo-status-bar'
import { Platform, useColorScheme, View } from 'react-native'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QrCodeIcon, UserCircleIcon } from 'react-native-heroicons/outline'
import { CalendarDaysIcon } from 'react-native-heroicons/solid'

import { NavigationParams } from './lib/Navigation'
import Main from './pages/Events'
import SettingsScreen from './pages/Settings'
import ScanScreen from './pages/Scan'
import ProfileScreen from './pages/Profile'
import EventPage from './pages/EventPage'
import OrganizationPage from './pages/OrganizationPage'
import CreateEvent from './pages/CreateEvent'
import Styles from './lib/Styles'

const MainStack = createNativeStackNavigator()
function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerLargeTitle: true
      }}>
      <MainStack.Screen name="Events" component={Main} />
    </MainStack.Navigator>
  )
}

const Tab = createBottomTabNavigator<NavigationParams>()

function PlatformPage() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Styles.colors.indigo['500'],
        tabBarStyle: Platform.OS === 'android' ? { paddingBottom: 4 } : {}
      }}>
      <Tab.Screen
        name="Main"
        component={MainStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CalendarDaysIcon color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused, size }) => (
            <View
              style={{
                borderRadius: 999,
                backgroundColor: focused
                  ? Styles.colors.indigo['500']
                  : Styles.colors.indigo['600'],
                padding: 15
              }}>
              <QrCodeIcon color={Styles.colors.indigo['50']} size={size + 6} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'My Profile',
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <UserCircleIcon color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator<NavigationParams>()

export default function App() {
  const scheme = useColorScheme()

  return (
    <>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            headerBackTitle: 'Back'
          }}>
          <Stack.Screen
            name="Platform"
            component={PlatformPage}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen
            name="EventPage"
            component={EventPage}
            options={({ route }) => ({ title: route.params.name })}
          />
          <Stack.Screen
            name="OrganizationPage"
            component={OrganizationPage}
            options={({ route }) => ({ title: route.params.name })}
          />
          <Stack.Screen name="CreateEvent" component={CreateEvent} />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </>
  )
}
