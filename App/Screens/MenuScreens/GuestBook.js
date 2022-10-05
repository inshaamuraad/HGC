import React, { useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import TopMenu from '../../Components/TopMenu';
import styles from '../../../Assets/css/style';
import DownMusicBar from '../../Components/DownMusicBar';
import { Button } from 'react-native-paper';
import Header from '../../Components/Header';
import { useNavigation } from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';
import AppServices from '../../Server/AppServices';

export default function GuestBook() {
 const navigation = useNavigation()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [country, setcountry] = useState('')
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [inviteName, setinviteName] = useState('')
  const [inviteEmail, setinviteEmail] = useState('')
  const [inviteCountry, setinviteCountry] = useState('')
  const [inviteCity, setinviteCity] = useState('')
  const [inviteState, setinviteState] = useState('')
  const [message, setmessage] = useState('')
  const [process, setprocess] = useState(false)


  const getContact = async () => {
    setprocess(true)
    const Storage = new AppServices();
    var res = await Storage.GuestBookDataStore(name, email, country, city, state, inviteName, inviteEmail, inviteCountry, inviteCity, inviteState, message);
    try {
      if (res.data.status == "Success") {
        navigation.navigate('Tabs')
        setname('')
        setemail('')
        setcountry('')
        setcity('')
        setstate('')
        setinviteName('')
        setinviteEmail('')
        setinviteCountry('')
        setinviteCity('')
        setinviteState('')
        setmessage('')

      }
    } catch (err) {
      setprocess(false)
      console.log(err)
    }

    setprocess(false)
  }

  return (
    <SafeAreaView style={styles.body}>

      <View style={{ paddingVertical: 10 }}>
        <Header />
      </View>
      <ScrollView>
        <View style={[styles.InputContainer, { marginTop: 30 }]}>
          <TextInput placeholder="First Name"
            placeholderTextColor="#031489"
            onChangeText={(text) => setname(text)}
            style={{ color: "#031489" }}

          />
        </View>
        <View style={[styles.InputContainer]}>
          <TextInput placeholder="Enter Email"
            placeholderTextColor="#031489"
            onChangeText={(text) => setemail(text)}
            style={{ color: "#031489" }}

          />
        </View>
        <View style={[styles.InputContainer]}>
          <TextInput placeholder="Country"
            placeholderTextColor="#031489"
            onChangeText={(text) => setcountry(text)}
            style={{ color: "#031489" }}

          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={[styles.InputContainerDouble,{color:'#031489', width: 180}]}>
            <TextInput placeholder="Enter City"
              placeholderTextColor="#031489"
              onChangeText={(text) => setcity(text)}
              style={{ color: "#031489" }}

            />
          </View>
          <View style={[styles.InputContainerDouble, {color:'#031489',width: 180}]}>
            <TextInput placeholder="Enter State"
              placeholderTextColor="#031489"
              onChangeText={(text) => setstate(text)}
              style={{ color: "#031489" }}

            />
          </View>
        </View>
        <Text style={{ fontWeight: "bold", color: "#031489", paddingHorizontal: 20, paddingVertical: 10 }}>Invite Friends & Family Members</Text>
        <View style={[styles.InputContainer, { marginTop: 10 }]}>
          <TextInput placeholder="First Name"
            placeholderTextColor="#031489"
            onChangeText={(text) => setinviteName(text)}
            style={{ color: "#031489" }}

          />
        </View>
        <View style={[styles.InputContainer]}>
          <TextInput placeholder="Enter Email"
            placeholderTextColor="#031489"
            onChangeText={(text) => setinviteEmail(text)}
            style={{ color: "#031489" }}

          />
        </View>
        <View style={[styles.InputContainer]}>
          <TextInput placeholder="Country"
            placeholderTextColor="#031489"
            onChangeText={(text) => setinviteCountry(text)}
            style={{ color: "#031489" }}

          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={[styles.InputContainerDouble,{width: 180}]}>
            <TextInput placeholder="Enter City"
              placeholderTextColor="#031489"
              onChangeText={(text) => setinviteCity(text)}
              style={{ color: "#031489" }} />
          </View>
          <View style={[styles.InputContainerDouble,{width: 180}]}>
            <TextInput placeholder="Enter State"
              placeholderTextColor="#031489"
              onChangeText={(text) => setinviteState(text)}
              style={{ color: "#031489" }}

            />
          </View>
        </View>
        <View style={[styles.InputContainer,{
          height: 40
        }]}>
          <TextInput placeholder="Enter Message"
            placeholderTextColor="#031489"
            onChangeText={(text) => setmessage(text)}
            style={{ color: "#031489" }}

            multiline />
        </View>
        <Button
          mode="contained"
          style={styles.btnContainer}
          onPress={() => getContact()}>
          SUBMIT
        </Button>
      </ScrollView>
      <DownMusicBar />
    </SafeAreaView>
  );
}
