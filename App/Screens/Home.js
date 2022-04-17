import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import PlayButton from '../../Assets/Icons/playButton.png'
import styles from '../../Assets/css/style';
import Carousel from './Carousel/Carousel';
import TopMenu from '../Components/TopMenu';
import DashBoardList from '../Components/DashBoardList';
import MusicFlatListDashBoard from '../Components/MusicFlatListDashBoard';
export default function Home() {


  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.body}>
          <View style={styles.TopContainer}>
            <View style={styles.searchBar}>
              <TextInput style={styles.Text}
                placeholder="Search"
                placeholderTextColor="#e7e7e7" />
            </View>
            <TouchableOpacity>
              <Image source={PlayButton} style={styles.playBtn} />
            </TouchableOpacity>
          </View>
          <TopMenu />
          <View style={{ flex: 1 }}>
            <Carousel />
            <DashBoardList />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 15 }}>
            <Text style={[styles.Text, { fontWeight: 'bold' }]}>MUSIC PLAYLIST</Text>
            <TouchableOpacity>
              <Text style={{ color: '#AD15FD' , fontWeight: 'bold'}}></Text>
            </TouchableOpacity>
          </View>
          <MusicFlatListDashBoard />
          </View>
        
        
      </View>

    </ScrollView>
    </SafeAreaView >
  );
}
