import React from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import TopMenu from '../../Components/TopMenu';
import styles from '../../../Assets/css/style';
import DownMusicBar from '../../Components/DownMusicBar';
export default function About() {
  return (
    <SafeAreaView style={styles.body}>
      <View style={{ paddingVertical: 20 }}>
        <TopMenu />
      </View>
      <View style={[styles.columnRadius, { marginVertical: 30, marginHorizontal: 5,paddingHorizontal: 10}]}>
        <Text style={{ alignSelf: 'center',fontSize: 24, fontWeight: 'bold',paddingVertical: 30}}>About Us</Text>
        <Text  style={{paddingVertical: 20}}>Gospel Choice Radio is operated and maintained by <Text style={{fontWeight: 'bold'}}>Hallelujah Gospel Globally.</Text> </Text>
    
        <Text style={{paddingVertical: 10}}>Franklin Record Productions was first started in 1999 that 
 gave the vision of a Hallelujah Gospel. It is the result of God’s 
 faithfulness and gave the vision of a Hallelujah Gospel.It is the result of God’s faithfulness and is dedicated solely to promote.</Text>
 <Text style={{paddingVertical: 10}}>

 Gospel music from Christian talents whose hearts long to give their utmost to the Lord.
   </Text>
      </View>
      <DownMusicBar />
    </SafeAreaView>
  );
}
