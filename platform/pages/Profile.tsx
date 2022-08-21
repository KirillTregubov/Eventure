import { StackNavigationProp } from '@react-navigation/stack'
import { useLayoutEffect, useState } from 'react'
import {
  Alert,
  Button,
  Image,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  useColorScheme,
  View
} from 'react-native'
import Modal from 'react-native-modal'
import { CogIcon } from 'react-native-heroicons/outline'
import { PlusIcon } from 'react-native-heroicons/solid'

import { NavigationParams } from '../lib/Navigation'
import Styles from '../lib/Styles'
import { User } from '../lib/DataTypes'

function OrganizationCard({
  organization,
  navigation
}: {
  organization: {
    name: string
  }
  navigation: StackNavigationProp<NavigationParams>
}): JSX.Element {
  const scheme = useColorScheme()

  return (
    <View
      style={{
        padding: 4
      }}>
      <TouchableHighlight
        onPress={() =>
          navigation.navigate('OrganizationPage', {
            name: organization.name
          })
        }
        underlayColor={scheme === 'dark' ? '#525252' : '#737373'}
        style={{
          backgroundColor: scheme === 'dark' ? '#262626' : '#d4d4d4',
          width: '100%',
          height: '100%',
          borderRadius: 8,
          padding: 8,
          paddingHorizontal: 10
        }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              marginTop: 'auto',
              fontWeight: '900',
              color: scheme === 'dark' ? 'white' : 'black'
              // consider using 'white' with image
            }}>
            {organization.name}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

// import { Form, Modal } from 'react-native-form-component'

function CreateOrganizationModal({
  userData,
  show,
  setShow,
  navigation
}: {
  userData: User
  show: boolean
  setShow: (show: boolean) => void
  navigation: StackNavigationProp<NavigationParams>
}): JSX.Element {
  const [organizationName, setOrganizationName] = useState('')
  const scheme = useColorScheme()

  const submit = () => {
    if (organizationName.length == 0) {
      Alert.alert('Error', 'Cannot create an organization with an empty name!')
      return
    }

    // post organization
    console.log('Post organization')
    // navigation.navigate('OrganizationPage', { name: organizationName })
  }

  return (
    <Modal
      // presentationStyle="overFullScreen"
      // animationType="slide"
      // transparent={true}
      isVisible={show}
      avoidKeyboard={true}
      onBackdropPress={() => {
        Keyboard.dismiss()
        setShow(false)
      }}
      style={{
        justifyContent: 'flex-end',
        paddingBottom: 8
      }}
      // onRequestClose={() => {
      //   Alert.alert('Modal has been closed.')
      //   setShow(!show)
      // }}
    >
      <View
        style={
          {
            // absolute: 'true',
            // bottom: 0,
            // display: 'flex',
            // height: '100%'
            // justifyContent: 'flex-end',
            // bottom: -500
          }
        }>
        <View
          style={[
            styles.modalView,
            {
              justifyContent: 'flex-end',
              backgroundColor:
                scheme === 'dark'
                  ? Styles.colors.neutral['900']
                  : Styles.colors.neutral['100']
            }
          ]}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 12,
              color: scheme === 'dark' ? 'white' : 'black'
            }}>
            Create an Organization
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: scheme === 'dark' ? 'white' : 'black'
            }}>
            Organization Name
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
            returnKeyType={'done'}
            onChangeText={setOrganizationName}
            onSubmitEditing={() => submit()}
            value={organizationName}
            placeholder={`${userData?.firstName}'s Organization`}
          />

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
              <PlusIcon
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
                Create Organization
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    borderRadius: 12,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})

type ProfileProps = {
  navigation: StackNavigationProp<NavigationParams, 'Profile'>
}

export default function Profile({ navigation }: ProfileProps) {
  const [show, setShow] = useState(false)

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
    organizations: [
      {
        name: 'My Cool Organization'
      },
      {
        name: 'NOTLIVEROCK'
      },
      { name: 'Family Get-togethers' }
    ]
  }

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <View style={{ paddingTop: Styles.paddingTop.container, height: 365 }}>
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
        {userData.organizations.length == 0 ? (
          <View style={{ height: 88 }}>
            <View
              style={{
                paddingTop: 16,
                paddingHorizontal: Styles.paddingHorizontal.container
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: scheme === 'dark' ? 'white' : 'black'
                }}>
                You need to have an organization to host an event.
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: scheme === 'dark' ? 'white' : 'black'
                }}>
                No worries, making one is free!
              </Text>
              <TouchableHighlight
                onPress={() => setShow(true)}
                // navigation.navigate('CreateOrganization')
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
                  <PlusIcon
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
                    Create Organization
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        ) : (
          <>
            <View
              style={{
                paddingTop: 16,
                paddingHorizontal: 18,
                paddingBottom: 4
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 22,
                  color: scheme === 'dark' ? 'white' : 'black'
                }}>
                My Organizations
              </Text>
            </View>
            <View
              style={{
                height: Platform.OS === 'android' ? 43 : 40,
                marginBottom: 2
              }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                style={{ marginHorizontal: 14 }}>
                {userData.organizations.map((organization, index) => (
                  <OrganizationCard
                    navigation={navigation}
                    organization={organization}
                    key={index}
                  />
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </View>
      <CreateOrganizationModal
        userData={userData}
        show={show}
        setShow={setShow}
        navigation={navigation}
      />
    </View>
  )
}
