import { BlurView } from 'expo-blur'
import * as Haptics from 'expo-haptics'
import React, { useCallback } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { BoltIcon, BoltSlashIcon } from 'react-native-heroicons/solid'
// @ts-expect-error Bug
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce'

const size = 50
const slop = 40

const hitSlop = { top: slop, bottom: slop, right: slop, left: slop }

export default function QRFooterButton({
  onPress,
  isActive = false,
  iconSize = 28
}: {
  onPress: () => void
  isActive?: boolean
  iconSize?: number
}) {
  const scheme = useColorScheme()

  const tint = scheme === 'dark' ? 'dark' : 'light'
  const iconColor = tint === 'dark' ? '#fff' : '#000'
  const intensity = isActive ? 100 : 45

  const onPressIn = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }, [])

  const onPressButton = useCallback(() => {
    onPress()
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }, [onPress])

  return (
    <TouchableBounce
      hitSlop={hitSlop}
      onPressIn={onPressIn}
      onPress={onPressButton}>
      <BlurView intensity={intensity} style={styles.container} tint={tint}>
        {isActive ? (
          <BoltIcon size={iconSize} color={'#FFD50B'} />
        ) : (
          <BoltSlashIcon size={iconSize} color={iconColor} />
        )}
      </BlurView>
    </TouchableBounce>
  )
}

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    overflow: 'hidden',
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
