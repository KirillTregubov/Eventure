import { useCallback, useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, useColorScheme, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Camera, FlashMode } from 'expo-camera'
import { BlurView } from 'expo-blur'
import { StackNavigationProp } from '@react-navigation/stack'
import { useIsFocused } from '@react-navigation/native'

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

type ScanProps = {
  navigation: StackNavigationProp<NavigationParams, 'Scan'>
}

export default function Scan({ navigation }: ScanProps) {
  const scheme = useColorScheme()
  const isFocused = useIsFocused()
  const [isVisible, setIsVisible] = useState(Platform.OS === 'ios')
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [flashEnabled, setFlashEnabled] = useState(false)
  const { top, bottom } = useSafeAreaInsets()

  if (!isVisible) {
    if (Platform.OS === 'android') {
      setTimeout(() => {
        setIsVisible(true)
      }, 100)
    } else if (Platform.OS === 'ios') {
      setIsVisible(true)
    }
  }

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = ({ data: url }: { data: string }) => {
    console.log('scanned', url)
    navigation.navigate('EventPage', { id: 'My Awesome Event' })
  }

  const onFlashToggle = useCallback(() => {
    setFlashEnabled((flashEnabled) => !flashEnabled)
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
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
        {isFocused ? (
          <Camera
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
            }}
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
            flashMode={flashEnabled ? FlashMode.torch : FlashMode.off}
          />
        ) : null}

        <View
          style={{
            top: 24 + top,
            position: 'absolute',
            right: 0,
            paddingHorizontal: '7%'
          }}>
          <QRFooterButton onPress={onFlashToggle} isActive={flashEnabled} />
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
            { bottom: 80 + bottom }
          ]}>
          <Hint>Scan Eventure QR Code</Hint>
        </View>
      </View>
    </View>
  )
}
