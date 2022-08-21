import { useState } from 'react'
import { TextInput } from 'react-native'
import Styles from '../lib/Styles'

const InputField = ({ placeholder, onChange }) => {
  const [text, onChangeText] = useState('')

  // const [number, onChangeNumber] = useState(null)

  const onChangeAction = (text) => {
    onChangeText(text)
    onChange(text)
  }

  return (
    <>
      <TextInput
        style={{
          color: Styles.colors.neutral['500'],
          backgroundColor: Styles.colors.neutral['100'],
          borderColor: Styles.colors.neutral['400'],
          placeholderTextColor: 'red',
          height: 40,
          marginVertical: 6,
          // margin: 12,
          borderWidth: 1,
          // padding: 2,
          paddingHorizontal: 8,
          borderRadius: Styles.borderRadius.input
        }}
        onChangeText={onChangeAction}
        value={text}
        placeholder={placeholder}
      />
      {/* <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10
        }}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      /> */}
    </>
  )
}

export default InputField
