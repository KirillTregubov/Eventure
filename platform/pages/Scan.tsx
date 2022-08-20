import { useCallback, useEffect, useReducer, useState } from 'react'
import { Platform, StyleSheet, Text, useColorScheme, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Camera, FlashMode } from 'expo-camera'
import { BlurView } from 'expo-blur'
import { StackNavigationProp } from '@react-navigation/stack'

import { NavigationParams } from '../lib/Navigation'
import QRIndicator from '../components/QRIndicator'
import QRFooterButton from '../components/QRFooterButton'

function Hint({ children }: { children: string }) {
  const scheme = useColorScheme()

  return (
    <BlurView
      style={{
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderRadius: 16,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      intensity={100}
      tint={scheme === 'dark' ? 'dark' : 'light'}>
      <Text
        style={{
          color: scheme === 'dark' ? '#fff' : '#000',
          backgroundColor: 'transparent',
          textAlign: 'center',
          fontSize: 16,
          fontWeight: '500'
        }}>
        {children}
      </Text>
    </BlurView>
  )
}

// type State = {
//   // isVisible: boolean
//   url: null | string
// }

// const initialState: State = {
//   // isVisible: Platform.OS === 'ios',
//   url: null
// }

type ScanProps = {
  navigation: StackNavigationProp<NavigationParams, 'Scan'>
}

export default function Scan({ navigation }: ScanProps) {
  const scheme = useColorScheme()
  const [isVisible, setIsVisible] = useState(Platform.OS === 'ios')
  const [scanned, setScanned] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [isLit, setLit] = useState(false)
  const { top, bottom } = useSafeAreaInsets()

  if (!isVisible && !scanned) {
    setTimeout(() => {
      setIsVisible(true)
    }, 100)
  }

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setScanned(false)
    })

    return unsubscribe
  }, [navigation])

  const handleBarCodeScanned = ({ data: url }: { data: string }) => {
    setScanned(true)
    setIsVisible(false)
    // set url ({ url })
    alert(`Bar code with type ${url} has been scanned!`)
    navigation.navigate('EventPage', { name: 'My Awesome Event' })
  }

  // const onCancel = useCallback(() => {
  //   if (Platform.OS === 'ios') {
  //     navigation.pop()
  //   } else {
  //     navigation.goBack()
  //   }
  // }, [])

  const onFlashToggle = useCallback(() => {
    setLit((isLit) => !isLit)
  }, [])

  if (hasPermission === null) {
    return (
      <View
        style={{
          top: top / 2,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Text
          style={{
            textAlign: 'center',
            paddingHorizontal: '10%',
            color: scheme === 'dark' ? 'white' : 'black'
          }}>
          Requesting camera permission...
        </Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return (
      <View
        style={{
          top: top / 2,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Text
          style={{
            textAlign: 'center',
            paddingHorizontal: '10%',
            color: scheme === 'dark' ? 'white' : 'black'
          }}>
          To continue, you&apos;ll need to allow Camera access in Settings.
        </Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>
       
      </Text>
      <Button
        title="Attend Event"
        onPress={() =>
          navigation.navigate('EventPage', {
            name: 'My Awesome Event'
          })
        }></Button> */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
        {isVisible ? (
          <Camera
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
            }}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
            flashMode={isLit ? FlashMode.torch : FlashMode.off}
          />
        ) : null}

        {/* {console.log(FlexAlignType)} */}
        <View
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              alignItems: 'space-between',
              paddingHorizontal: '12%'
            },
            { top: 24 + top }
          ]}>
          <QRFooterButton
            onPress={onFlashToggle}
            action="flashlight"
            isActive={isLit}
          />
        </View>

        <QRIndicator />

        <View
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center'
            },
            { bottom: 50 + bottom }
          ]}>
          <Hint>Scan Eventure QR Code</Hint>
        </View>
      </View>
    </View>
  )
}
