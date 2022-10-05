import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, SafeAreaView, TextInput, Dimensions, Image } from 'react-native';
import styles from '../../../Assets/css/style';
import DownMusicBar from '../../Components/DownMusicBar';
import { Button } from 'react-native-paper';
import Header from '../../Components/Header';
import AppServices from '../../Server/AppServices';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Web from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../../../Assets/Images/hgc.jpeg'
import { useIsFocused } from '@react-navigation/core';
import Loading from '../../Components/Loading'
export default function Contact() {

  const focus = useIsFocused()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [message, setmessage] = useState('')
  const [emailShow, setemailShow] = useState('')
  const [nameShow, setnameShow] = useState('')
  const [process, setprocess] = useState(false)
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;


  useEffect(() => {
    focus
  }, [focus])


  const getContact = async () => {
    
    setprocess(true)
    const Storage = new AppServices();
    var res = await Storage.contactDataStore(name, email, message);
    try {
      if (res.data.status == "Success") {
        againRefresh()

        let namee = res.data.data.name
        let emaill = res.data.data.email

        alert('Your Data is successfully submitted')

      }
    } catch (err) {
      setprocess(false)
      console.log(err)
    }

    setprocess(false)


  }
  const againRefresh = async () => {
    setname('')
    setemail('')
    setmessage('')

  }

  return (
    <SafeAreaView style={styles.body}>

      <View style={{ paddingVertical: 10 }}>
        <Header />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          width: windowWidth - 50, height: windowHeight - 300, backgroundColor: '#fff',
          shadowOffset: {
            width: 10,
            height: 5,
          },
          shadowOpacity: 0.20,
          shadowRadius: 10.00,
          elevation: 10,
          borderWidth: 1, borderColor: '#fff'
        }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            <Image style={{ width: 180, height: 50 }} source={Logo} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30, marginTop: 50 }}>
            <Icon name="ios-git-network-sharp" size={20} color="#031489" />
            <Text style={{ color: '#031489', paddingHorizontal: 10 }}>Gospel Choice Radio</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30, marginTop: 10 }}>
            <Web name="web" size={20} color="#031489" />
            <Text style={{ color: '#031489', paddingHorizontal: 10 }}>https://hgcradio.org</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30, marginTop: 10 }}>
            <Web name="email-variant" size={20} color="#031489" />
            <Text style={{ color: '#031489', paddingHorizontal: 10 }}>radio@hellelujahgospel.com</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
            <View style={[styles.InputContainerDoubleContact, {
              width: 150,



            }]}>
              <TextInput placeholder="First Name"
                placeholderTextColor="#031489"
                onChangeText={(text) => setname(text)}
                style={{ color: "#031489" }}

              />
            </View>
            <View style={[styles.InputContainerDoubleContact, {
              width: 150,

            }]}>

              <TextInput
                placeholder= "Enter Email" 
                placeholderTextColor="#031489"
                onChangeText={(text) => setemail(text)}
                style={{ color: "#031489" }}

              />

            </View>
          </View>
          <View style={[styles.InputContainerDoubleContact, {


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
        </View>

      </ScrollView>
      <DownMusicBar />
      {process == true &&
        <Loading />
      }
    </SafeAreaView >
  );
}
