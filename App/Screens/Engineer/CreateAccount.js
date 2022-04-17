import React, { useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styles from '../../../Assets/css/style';
import DownMusicBar from '../../Components/DownMusicBar';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import AppServices from '../../Server/AppServices';

export default function CreatAcount() {
  const navigation = useNavigation()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [country, setcountry] = useState('')
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [zipCode, setzipCode] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('')
  const [process, setprocess] = useState(false)


  const getContact = async () => {
    debugger

    setprocess(true)
    debugger
    const Storage = new AppServices();
    let res = await Storage.storeRegisterArtist(name, email.toLowerCase(), password, confirmPassword, city, state, zipCode, country)
    try {
      if (res.data.status == "Success") {
        debugger
        navigation.navigate('Login');

        alert('Verfication email has sent to your Email')
      } else {
        debugger
        alert(res.response.data.message)
      }
    } catch (error) {
      debugger

      alert(res.response.data.message.email[0])
    }

    setprocess(false)
  }

  return (
    <SafeAreaView style={styles.body}>
      <Text style={{ paddingTop: 40, paddingHorizontal: 20, fontSize: 16, color: '#CB3BF7', fontWeight: 'bold' }}>Create An Account
      </Text>
      <ScrollView>
        <View style={[styles.InputContainer, { marginTop: 30, borderColor: '#292929' }]}>
          <TextInput placeholder="First Name"
            placeholderTextColor="#fff"
            onChangeText={(text) => setname(text)}
            style={{ color: '#fff' }}

          />
        </View>
        <View style={[styles.InputContainer, { borderColor: '#292929' }]}>
          <TextInput placeholder="Enter Email"
            placeholderTextColor="#fff"
            onChangeText={(text) => setemail(text)}
            style={{ color: '#fff' }}
          />
        </View>
        <View style={[styles.InputContainer, { borderColor: '#292929' }]}>
          <TextInput placeholder="Password"
            placeholderTextColor="#fff"
            onChangeText={(text) => setPassword(text)}
            style={{ color: '#fff' }}

          />
        </View>
        <View style={[styles.InputContainer, { borderColor: '#292929' }]}>
          <TextInput placeholder="Confirm Password"
            placeholderTextColor="#fff"
            onChangeText={(text) => setconfirmPassword(text)}
            style={{ color: '#fff' }}

          />
        </View>
        <View style={[styles.InputContainer, { borderColor: '#292929' }]}>
          <TextInput placeholder="Country"
            placeholderTextColor="#fff"
            onChangeText={(text) => setcountry(text)}
            style={{ color: '#fff' }}

          />
        </View>
        <View style={[styles.InputContainer, { borderColor: '#292929' }]}>
          <TextInput placeholder="City"
            placeholderTextColor="#fff"
            onChangeText={(text) => setcity(text)}
            style={{ color: '#fff' }}

          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={[styles.InputContainerDouble, { borderColor: '#292929' }]}>
            <TextInput placeholder="Enter State"
              placeholderTextColor="#fff"
              onChangeText={(text) => setstate(text)}
              style={{ color: "#fff" }} />
          </View>
          <View style={[styles.InputContainerDouble, { borderColor: '#292929' }]}>
            <TextInput placeholder="Zip Code"
              placeholderTextColor="#fff"
              onChangeText={(text) => setzipCode(text)}
              style={{ color: '#fff' }}

            />
          </View>
        </View>

        <Button
          mode="contained"
          style={[styles.btnContainer, { backgroundColor: '#4F1769' }]}
          onPress={() => getContact()}>
          SUBMIT
        </Button>

        <View style={{ flexDirection: 'row', alignItems: "center", alignSelf: 'center' }}>
          <Text style={{ color: '#fff', paddingVertical: 20 }}>
            Already have an account ?{' '}

          </Text>
          <TouchableOpacity  >
            <Text
              style={{

                color: '#fff',
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <DownMusicBar />
    </SafeAreaView>
  );
}
