import React, { useState} from 'react';
import { View, ScrollView, Text, SafeAreaView, TextInput, } from 'react-native';
import styles from '../../../Assets/css/style';
import DownMusicBar from '../../Components/DownMusicBar';
import { Button } from 'react-native-paper';
import Header from '../../Components/Header';
import AppServices from '../../Server/AppServices';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Contact() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [message, setmessage] = useState('')
  const [emailShow, setemailShow] = useState('')
  const [nameShow, setnameShow] = useState('')
const [process, setprocess] = useState(false)




const getContact = async () => {
  setprocess(true)
  const Storage = new AppServices();
  var res = await Storage.contactDataStore(name,email,message);
  try {
    if (res.data.status == "Success") {
    let namee =res.data.data.name
    let emaill =res.data.data.email
      setname('')
      setemail('')
      setmessage('')
    setnameShow(namee)
    setemailShow(emaill)
   

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
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={[styles.InputContainer, { marginTop: 30 }]}>
          <TextInput placeholder= "First Name"
            onChangeText={(text) => setname(text)}
            placeholderTextColor="#fff" 
          style={{color: '#CB3BF7'}}/>
        </View>
        <View style={[styles.InputContainer]}>
          <TextInput placeholder="Enter Email"
            onChangeText={(text) => setemail(text)}
            placeholderTextColor="#fff" 
            style={{ color: '#CB3BF7' }} />

        </View>
        <View style={[styles.MessageContainer]}>
          <TextInput placeholder="Enter Message"
            onChangeText={(text) => setmessage(text)}
            placeholderTextColor="#fff" multiline 
            style={{ color: '#CB3BF7' }} />

        </View>
        <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
          <Text style={{ fontSize: 10, color: "#fff" }}>Name: {nameShow}</Text>
          <Text style={{ fontSize: 10, color: "#fff", marginTop: 10 }}>Email : <Text style={{ fontSize: 10, color: "#fff", marginTop: 10 }}>{emailShow}</Text></Text>

        </View>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => getContact()}>
          <Button
            mode="contained"
            style={{ width: 200, backgroundColor: '#9948a3', paddingVertical: 10,borderRadius:99, color: '#000' }}
           >
            SUBMIT
          </Button>


        </TouchableOpacity>
       
      </ScrollView>
      <DownMusicBar />
    </SafeAreaView>
  );
}
