import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Play from 'react-native-vector-icons/AntDesign';
import Carousel from 'react-native-snap-carousel';
import styles from '../../Assets/css/style';
import TrackPlayer, { State } from 'react-native-track-player';
import LottieView from 'lottie-react-native';
import Demo from '../../Assets/Images/demo.png';
import { useIsFocused } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import AppServices from '../Server/AppServices';
import music from '../../Assets/Images/live.jpeg'





export default function HomeScreen({ navigation }) {

  const isFocused = useIsFocused();
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [albums, setalbums] = useState([])
  const [albumss, setalbumss] = useState([])
  const [process, setprocess] = useState(false)
  const [refresh, setrefresh] = useState(true)
  const [filterData, setFilterData] = useState([])
  const [filterDataa, setFilterDataa] = useState([])


  const carouselRef = useRef('')
  const carouselItems = [
    {
      url: require('../../Assets/Images/demo4.jpeg')
    },
    {
      url: require('../../Assets/Images/musicDemo3.jpg')
    },
    {
      url: require('../../Assets/Images/imageDemo.jpeg')
    },

  ]
  const trackPlayerInit = async () => {
    await TrackPlayer.stop()
    await TrackPlayer.add([{
      // id: '1',
      // url:'https://my.hgcradio.org:8000/radio.mp3',
      url: 'https://my.hgcradio.org:8000/radio.mp3', // Load media from the network
      title: 'Avaritia',
      artist: 'deadmau5',
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
      date: '2014-05-20T07:00:00+00:00', // RFC 3339
      artwork: 'http://example.com/cover.png', // Load artwork from the network
      duration: 402 // Duration in seconds
    }]);
  
  };
 //initialize the TrackPlayer when the App component is mounted
 useEffect(() => {
 
  const startPlayer = async () => {
    let isInit = await trackPlayerInit();
    setIsTrackPlayerInit(isInit);
  }
  startPlayer();

}, [isFocused]);

//start playing the TrackPlayer when the button is pressed 
const onButtonPressed = async() => {

  const state = await TrackPlayer.getState();

 debugger
  if (!isPlaying) {
    TrackPlayer.play();
    setIsPlaying(true);
  } else {
    TrackPlayer.pause();
    setIsPlaying(false);
  }
}
  useEffect(() => {
    getAlbumsCatelog();
  }, [])

  const getAlbumsCatelog = async () => {
    setprocess(true)
    const Storage = new AppServices();
    var res = await Storage.getApi();

    try {
      if (res.data) {

        let albumData = res.data.data.albums
        setalbums(albumData)
        setFilterData(albumData)



      }
    } catch (err) {
      setprocess(false)
      console.log(err)
    }

    setprocess(false)
  }

  useEffect(() => {
    getEngineerCatelog();
  }, [])

  const getEngineerCatelog = async () => {
    setprocess(true)
    const Storage = new AppServices();
    var res = await Storage.getHost();
    try {
      if (res.data) {
        let albumData = res.data.data
        setalbumss(albumData)
        setFilterDataa(albumData)


      }
    } catch (err) {
      setprocess(false)
      console.log(err)
    }

    setprocess(false)
  }



  const _renderItem = ({ item, index }) => {
    return (
      <View style={[styles.sliderContainer, {
        borderWidth: 1, borderColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 60, shadowColor: '#CB3BF7'
      }]}>
        <Image style={{ height: 150, width: 230, borderRadius: 20, }} source={item.url} />
        <View style={{
          position: 'absolute', backgroundColor: '#0009', borderRadius: 20,
          height: 150,
          padding: 50,
          marginLeft: 25,
          marginRight: 25,
          justifyContent: 'center',
          alignItems: 'center',
          width: 230,
        }}>
          <Text style={{ color: '#e7e7e7e7', fontWeight: 'bold', fontSize: 11 }}>
            Hallelujah Choice Radio
          </Text>
        </View>

      </View >
    )
  }


  const renderItemmm = ({ item }) => {
    setprocess(false)
    return (
      <View style={{ margin: 5, }}>
        <TouchableOpacity style={{
          width: 53, height: 53, borderRadius: 99, borderColor: '#000', borderWidth: 2, shadowOffset: {
            width: 0,
            height: 10,
            borderRadius: 99
          },
          shadowOpacity: 0.15,
          shadowRadius: 3.00,
          elevation: 10, shadowColor: '#fff'
        }} onPress={() => navigation.navigate('BuyAlbum', {
          title: item.title,
          url: item.image_url,
          artist: item.artist_name,
          id: item.id,
          purchase_url: item.purchase_url
        })} >
          <Image style={{ width: 50, height: 50, borderRadius: 99 }} source={{ uri: item.image_url }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 7, color: '#CB3BF7', alignSelf: 'center', marginTop: 15 }}>{item.title}</Text>
      </View>

    )
  }

  const renderItemm = ({ item }) => {
    return (
      <View style={{ margin: 5, paddingHorizontal: 8 }}>
        <TouchableOpacity style={{
          width: 60, height: 60, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10,
          shadowOffset: {
            width: 0,
            height: 15,
            borderRadius: 99
          },
          shadowOpacity: 0.20,
          shadowRadius: 10.00,
          elevation: 10, shadowColor: '#e7e7e7'
        }} onPress={() => navigation.navigate('WeeklySchedule', {
          id: item.id
        })}>
        <Image source={{ uri: item.avatar_url }} style={{ width: 55, height: 55, borderRadius: 10, alignSelf: 'center' }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 7, color: '#CB3BF7', alignSelf: 'center', marginTop: 15 }}>{item.name}</Text>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 60 }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="align-right" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: 'bold' }}></Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Carousel
            layout={"default"}
            ref={carouselRef}
            data={carouselItems}
            sliderWidth={400}
            itemWidth={280}
            renderItem={_renderItem}
            style={{ marginTop: 30 }}/>
        </View>
        <View style={{ flex: 1.6 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 35 }}>
            <Text style={[styles.Text, { fontWeight: 'bold', color: "#CB3BF7" }]}>MUSIC PLAYLIST</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AlbumCatlog')}>
              <Play name="right" size={20} color="#CB3BF7" />
            </TouchableOpacity>
          </View>
          {filterData ? <View style={{ marginTop: 20, paddingHorizontal: 30 }}>
            <FlatList
              data={filterData}
              horizontal={true}
              renderItem={renderItemmm}
              keyExtractor={item => item.id}
            />
          </View>
            :
          <View>
          <Text>No data</Text>
          </View>
          }
          <TouchableOpacity style={{
            paddingHorizontal: 20, paddingVertical: 10,shadowOffset: {
              width: 0,
              height: 15,
            },
            shadowOpacity: 0.50,
            shadowRadius: 12.00,
            elevation: 70, shadowColor: '#fff'
          }} onPress={() => navigation.navigate('RadioLive')} >
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingHorizontal: 20, height: 50, borderRadius: 5, borderWidth: 0.5, borderColor: '#000', justifyContent: 'center', elevation:10}} colors={['#4F4C4D', '#ffffff00',]}>
              <View style={{ flexDirection: 'row', alignItems:'center',justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Image style={{ width: 40, height: 40, borderRadius: 0 }} source={music} />
                <View style={{paddingHorizontal:5, alignSelf:'center'}}>
                  <Text style={{ color: '#FFF', fontSize: 10 }}>HAELELLUJAH GOSPEL GLOBALLY RADIO </Text>
                  <Text style={{ color: '#000', fontSize: 10, paddingVertical: 3 }}>Live Music onAir</Text>
                </View>
                </View>
                  <Play name="playcircleo" size={20} color="#ff0065" style={{ alignSelf: 'center' }} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 35 }}>
            <Text style={[styles.Text, { fontWeight: 'bold', color: "#CB3BF7" }]}>ENGINEERS</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Engineers')}>
              <Play name="right" size={20} color="#CB3BF7" />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
            <FlatList
              data={filterDataa}
              horizontal={true}
              renderItem={renderItemm}
              keyExtractor={item => item.id}/>
          </View>
        </View>
    </ScrollView>
      </View>
  );
}
