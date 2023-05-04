import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useRef, useState } from 'react'
import {
  Text,
  TouchableHighlight,
  useColorScheme,
  TextInput,
  View,
  ScrollView,
  Button,
  Alert
} from 'react-native'
// import { FloatingLabelInput } from 'react-native-floating-label-input'
import { CalendarIcon, PlusIcon } from 'react-native-heroicons/solid'

import Styles from '../lib/Styles'
import DateTimePicker, {
  DateTimePickerAndroid
} from '@react-native-community/datetimepicker'
// import DatePicker from 'react-native-date-picker'

export default function CreateEvent() {
  const scheme = useColorScheme()
  const [eventName, setEventName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [platformType, setPlatformType] = useState('')
  const [maxAttendees, setMaxAttendees] = useState(0)
  const [startDate, setStartDate] = useState(new Date())
  const [startDateOpen, setStartDateOpen] = useState(false)

  const input2 = useRef<TextInput | null>(null)
  const input3 = useRef<TextInput | null>(null)
  const input4 = useRef<TextInput | null>(null)

  const organizationData = {
    name: 'My Cool Organization'
  }

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate
  //   setShow(false)
  //   setDate(currentDate)
  // }

  const submit = () => {
    if (eventName.length == 0) {
      Alert.alert(
        'Scheduling Error',
        'Cannot create an event with an empty name!'
      )
      return
    }
    if (greeting.length == 0) {
      Alert.alert(
        'Scheduling Error',
        'Cannot create an event without a greeting!'
      )
      return
    }
    if (platformType.length == 0) {
      Alert.alert(
        'Scheduling Error',
        'Cannot create an event without a platform type!'
      )
      return
    }
    if (maxAttendees == 0) {
      Alert.alert(
        'Scheduling Error',
        "Cannot create an event that doesn't allow attendees!"
      )
      return
    }

    // redirect to newly created event page
    console.log('submit')
  }

  return (
    <KeyboardAwareScrollView extraScrollHeight={16}>
      <ScrollView>
        <View
          style={{
            paddingTop: Styles.paddingTop.container,
            paddingHorizontal: Styles.paddingHorizontal.container
          }}>
          <>{/* TODO: SVG */}</>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 12,
              color: scheme === 'dark' ? 'white' : 'black'
            }}>
            Create an Event
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: scheme === 'dark' ? 'white' : 'black'
            }}>
            Event Name
          </Text>
          <TextInput
            placeholderTextColor={
              scheme === 'dark'
                ? Styles.colors.neutral['500']
                : Styles.colors.neutral['400']
            }
            style={{
              color:
                scheme === 'dark'
                  ? Styles.colors.neutral['300']
                  : Styles.colors.neutral['800'],
              backgroundColor:
                scheme === 'dark'
                  ? Styles.colors.neutral['700']
                  : Styles.colors.neutral['200'],
              borderColor:
                scheme === 'dark'
                  ? Styles.colors.neutral['500']
                  : Styles.colors.neutral['400'],
              height: 40,
              marginVertical: 6,
              borderWidth: 1,
              paddingHorizontal: 8,
              borderRadius: Styles.borderRadius.input
            }}
            clearButtonMode={'while-editing'}
            returnKeyType={'next'}
            blurOnSubmit={false}
            onChangeText={setEventName}
            onSubmitEditing={() => input2.current?.focus()}
            value={eventName}
            placeholder={`${organizationData.name}'s Event`}
          />

          <View style={{ marginTop: 8 }}>
            <Text
              style={{
                fontSize: 13,
                color: scheme === 'dark' ? 'white' : 'black'
              }}>
              Greeting
            </Text>
            <TextInput
              placeholderTextColor={
                scheme === 'dark'
                  ? Styles.colors.neutral['500']
                  : Styles.colors.neutral['400']
              }
              style={{
                color:
                  scheme === 'dark'
                    ? Styles.colors.neutral['300']
                    : Styles.colors.neutral['800'],
                backgroundColor:
                  scheme === 'dark'
                    ? Styles.colors.neutral['700']
                    : Styles.colors.neutral['200'],
                borderColor:
                  scheme === 'dark'
                    ? Styles.colors.neutral['500']
                    : Styles.colors.neutral['400'],
                height: 40,
                marginVertical: 6,
                borderWidth: 1,
                paddingHorizontal: 8,
                borderRadius: Styles.borderRadius.input
              }}
              clearButtonMode={'while-editing'}
              returnKeyType={'next'}
              blurOnSubmit={false}
              onChangeText={setGreeting}
              onSubmitEditing={() => input3.current?.focus()}
              value={greeting}
              ref={input2}
              placeholder="Welcome to our event!"
            />
          </View>

          <View style={{ marginTop: 8 }}>
            <Text
              style={{
                fontSize: 13,
                color: scheme === 'dark' ? 'white' : 'black'
              }}>
              Platform Type
            </Text>
            <TextInput
              placeholderTextColor={
                scheme === 'dark'
                  ? Styles.colors.neutral['500']
                  : Styles.colors.neutral['400']
              }
              style={{
                color:
                  scheme === 'dark'
                    ? Styles.colors.neutral['300']
                    : Styles.colors.neutral['800'],
                backgroundColor:
                  scheme === 'dark'
                    ? Styles.colors.neutral['700']
                    : Styles.colors.neutral['200'],
                borderColor:
                  scheme === 'dark'
                    ? Styles.colors.neutral['500']
                    : Styles.colors.neutral['400'],
                height: 40,
                marginVertical: 6,
                borderWidth: 1,
                paddingHorizontal: 8,
                borderRadius: Styles.borderRadius.input
              }}
              clearButtonMode={'while-editing'}
              returnKeyType={'next'}
              blurOnSubmit={false}
              onChangeText={setPlatformType}
              onSubmitEditing={() => input4.current?.focus()}
              value={platformType}
              ref={input3}
              placeholder="Hybrid"
            />
          </View>

          <View style={{ marginTop: 8 }}>
            <Text
              style={{
                fontSize: 13,
                color: scheme === 'dark' ? 'white' : 'black'
              }}>
              Max Attendees
            </Text>
            <TextInput
              placeholderTextColor={
                scheme === 'dark'
                  ? Styles.colors.neutral['500']
                  : Styles.colors.neutral['400']
              }
              style={{
                color:
                  scheme === 'dark'
                    ? Styles.colors.neutral['300']
                    : Styles.colors.neutral['800'],
                backgroundColor:
                  scheme === 'dark'
                    ? Styles.colors.neutral['700']
                    : Styles.colors.neutral['200'],
                borderColor:
                  scheme === 'dark'
                    ? Styles.colors.neutral['500']
                    : Styles.colors.neutral['400'],
                height: 40,
                marginVertical: 6,
                borderWidth: 1,
                paddingHorizontal: 8,
                borderRadius: Styles.borderRadius.input
              }}
              clearButtonMode={'while-editing'}
              blurOnSubmit={false}
              onChangeText={(text) => setMaxAttendees(parseInt(text, 10))}
              onSubmitEditing={() => submit()}
              value={maxAttendees.toString()}
              keyboardType={'numeric'}
              ref={input4}
              placeholder="100"
            />
          </View>

          {/* Price */}
          {/* <View style={{ marginTop: 8 }}>
            <Text
              style={{
                fontSize: 13,
                color: scheme === 'dark' ? 'white' : 'black'
              }}>
              Price
            </Text>
            <TextInput
              placeholderTextColor={
                scheme === 'dark'
                  ? Styles.colors.neutral['500']
                  : Styles.colors.neutral['400']
              }
              style={{
                color:
                  scheme === 'dark'
                    ? Styles.colors.neutral['300']
                    : Styles.colors.neutral['800'],
                backgroundColor:
                  scheme === 'dark'
                    ? Styles.colors.neutral['700']
                    : Styles.colors.neutral['200'],
                borderColor:
                  scheme === 'dark'
                    ? Styles.colors.neutral['500']
                    : Styles.colors.neutral['400'],
                height: 40,
                marginVertical: 6,
                borderWidth: 1,
                paddingHorizontal: 8,
                borderRadius: Styles.borderRadius.input
              }}
              clearButtonMode={'while-editing'}
              returnKeyType={'next'}
              blurOnSubmit={false}
              onChangeText={setPlatformType}
              onSubmitEditing={() => input4.current.focus()}
              value={platformType}
              // ref={input3}
              placeholder="Hybrid"
            />
          </View> */}

          <TouchableHighlight
            onPress={() => submit()}
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
                Schedule Event
              </Text>
            </View>
          </TouchableHighlight>
          {/* <TextInput placeholder="Organization Name" onChange={onChangeText} /> */}
          {/* <TextInput placeholder="My Organization" onChange={onChangeText} /> */}

          {/* <Text
        style={{
          textAlign: 'center',
          color: scheme === 'dark' ? 'white' : 'black'
        }}>
        Stats (Points earned, events attended, organizations visited)
      </Text> */}
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}
