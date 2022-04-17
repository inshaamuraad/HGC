import React from 'react';
import { View, ScrollView, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';

import styles from '../../Assets/css/style';
import { Button } from 'react-native-paper';

export default function Phone() {
  return (
    <SafeAreaView style={styles.body}>

     
      <ScrollView>
        <View style={[styles.InputContainer, { marginTop: 50 }]}>
          <TextInput placeholder="First Name"
          placeholderTextColor= "#000" />
        </View>
        <View style={[styles.InputContainer]}>
          <TextInput placeholder="Last Name" 
          placeholderTextColor= "#000"/>
        </View>
        <View style={[styles.InputContainer]}>
          <TextInput placeholder="Enter Email" 
          placeholderTextColor= "#000"/>
        </View>
        <View style={[styles.MessageContainer]}>
          <TextInput placeholder="Enter Message"
          placeholderTextColor= "#000"  multiline />
        </View>
        <View style={{paddingHorizontal: 30, paddingVertical: 20}}>
          <Text style={{fontSize: 10, color: "#fff"}}>Email: radio@hallelujahgospel.com</Text>
          <Text style={{fontSize: 10, color: "#fff", marginTop: 10}}>Address : <Text style={{fontSize: 10, color: "#fff", marginTop: 10}}>Hallelujah Gospel Globally 231 CA, 94583, USA</Text></Text>

          </View>
        <Button
          mode="contained"
          style={styles.btnContainer}
          onPress={() => console.log('Pressed')}>
          SUBMIT
        </Button>

      </ScrollView>
    </SafeAreaView>
  );
}
