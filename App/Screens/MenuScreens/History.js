import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import styles from '../../../Assets/css/style';
import TopMenu from '../../Components/TopMenu';
import DownMusicBar from '../../Components/DownMusicBar';
import AppServices from '../../Server/AppServices';
import Header from '../../Components/Header'
import Loading from '../../Components/Loading';
import TimedSlideshow from 'react-native-timed-slideshow';
import { Searchbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Nodata from '../../../Assets/Icons/noData.png'

import moment from 'moment';
export default function History() {
  const [getHistoryData, setgetHistoryData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [process, setprocess] = useState(false)
  const [albumName, setalbumName] = useState('')
  const [slug, setslug] = useState('')
  const [titleName, settitleName] = useState('')
  const [titleLast, settitleLast] = useState('')
  const [nameLast, setNameLast] = useState('')
  const [slugLast, setSlugLast] = useState('')
  const [url, seturl] = useState('')



  const items = [
    {
      uri: "https://freedesignfile.com/upload/2018/06/DJ-girl-swings-with-music-Stock-Photo-01.jpg",

    },
    {
      uri: "https://www.teahub.io/photos/full/264-2647132_billie-eilish-wallpaper-concert.jpg"
    },
    {
      uri: "https://media.istockphoto.com/photos/the-musicians-were-playing-rock-music-on-stage-there-was-an-audience-picture-id1319479588?b=1&k=20&m=1319479588&s=170667a&w=0&h=bunblYyTDA_vnXu-nY4x4oa7ke6aiiZKntZ5mfr-4aM=",

    },

  ]

  useEffect(() => {
    getHistoryDataa();
  }, [])

  const searchFilterFunction = (text) => {
    if (text) {
      let _text = text.toUpperCase()
      let newData = getHistoryData.filter(function (str) { return ((str.title).toUpperCase()).includes(_text); });
      setFilterData(newData);
    } else {
      setFilterData(getHistoryData);
    }
  };
  const getHistoryDataa = async () => {
    setprocess(true)
    const Storage = new AppServices();
    var res = await Storage.getHistory();
    try {
      if (res.data) {
        let albumData = res.data.data
        setgetHistoryData(albumData)
        setFilterData(albumData)
      }
    } catch (err) {
      setprocess(false)
      console.log(err)
    }
    setprocess(false)
  }
  function EmptySpace() {
    return (
      <>
        <View style={{ height: 0, width: 0 }}>
        </View>
      </>
    )
  }
  useEffect(() => {
    nowPlayingSong()
  }, [])
  const nowPlayingSong = async () => {
    setprocess(true)
    const Storage = new AppServices();
    var res = await Storage.getCurrentSong();
    try {
      if (res.data) {
        let albumData = res.data.data.next
        let albumDataa = res.data.data.now_playing
        let albumDattaa = res.data.data.show

        settitleName(albumData.title)
        setalbumName(albumData.artist)
        setslug(albumData.text)
        settitleLast(albumDataa.title)
        setNameLast(albumDataa.artist)
        seturl(albumDattaa.host_image)
        setSlugLast(albumDataa.text)
      }
    } catch (err) {
      setprocess(false)
      console.log(err)
    }
    setprocess(false)
  }
  const _reviewitem = ({ item }) => {
    return (
      <View>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#fff', '#fff',]}
          style={{
            paddingVertical: 5, marginTop: 0, borderRadius: 7, paddingHorizontal: 10, shadowOffset: {
              width: 0,
              height: 15,
            },
            shadowOpacity: 0.60,
            shadowRadius: 15.00,
            elevation: 10,
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', }}>
              <Image source={{ uri: url }} style={{ width: 90, height: 90, borderRadius: 5, resizeMode: 'contain', }} />
              <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                <View style={{ width: "86%", }}>
                  <Text style={[styles.Text, { fontSize: 14, color: '#031489' }]}>Title : {item.title}</Text>

                </View>
                <Text style={[styles.Text, { fontSize: 12, marginTop: 5 }]}>Artist : {item.artist ? item.artist : 'Not Found'}</Text>
                <Text style={{ fontSize: 12, color: '#000', marginTop: 5 }}>Played Timing: {moment(item.play_at, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY").toString()}</Text>

              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.body}>
      <Header />

      <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View
            style={{
              width: 180, height: 140, backgroundColor: '#031489', borderRadius: 5,
              shadowOffset: {
                width: 0,
                height: 15,
              },
              shadowOpacity: 0.60,
              shadowRadius: 15.00,
              elevation: 20,
              borderStyle: 'dashed', borderWidth: 1,
              borderColor: '#fff',
              resizeMode: 'contain'
            }}>

            <View style={{ width: 177, borderStyle: 'dashed', borderWidth: 1, paddingVertical: 5, borderColor: "#031489", backgroundColor: "#fff", justifyContent: "center", alignItems: 'center' }}>
              <Text style={{ color: '#031489', fontWeight: 'bold' }}>Now Playing</Text>
            </View>



            <Image style={{ height: 110, }} source={{ uri: url }} />

            <View style={{
              position: 'absolute', backgroundColor: '#0009',
              height: 110,
              width: '100%',
              top: 30


            }}>




              <View style={{


              }}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginTop: 3 }}>
                  <Text style={{ fontSize: 10, color: "#fff", fontWeight: 'bold' }}>Title : {titleLast}</Text>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 10, color: "#fff", fontWeight: 'bold', marginTop: 2 }}>Artist: {nameLast}</Text>
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginTop: 6 }}>

        <Text style={{ fontSize: 12, color: "#fff", fontWeight: 'bold', }}>Status: </Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: item.show.status == 'Active' ? '#fff' : 'yellow' }}> {item.show.status}</Text>

      </View> */}


                  </View>
                </View>

              </View>
            </View>

          </View>
          <View

            style={{
              width: 180, height: 140, backgroundColor: '#031489', borderRadius: 5,
              shadowOffset: {
                width: 0,
                height: 15,
              },
              shadowOpacity: 0.60,
              shadowRadius: 15.00,
              elevation: 20,
              borderStyle: 'dashed', borderWidth: 1,
              borderColor: '#fff'
            }}>

            <View style={{ width: 177, borderStyle: 'dashed', borderWidth: 1, paddingVertical: 5, borderColor: "#031489", backgroundColor: "#fff", alignItems: 'center' }}>
              <Text style={{ color: '#031489', fontWeight: 'bold' }}>Next Playing</Text>


            </View>
            <Image style={{ height: 110, }} source={{ uri: url }} />

            <View style={{
              position: 'absolute', backgroundColor: '#0009',
              height: 110,
              width: '100%',
              top: 30


            }}>


              <View style={{


              }}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginTop: 3 }}>
                  <Text style={{ fontSize: 10, color: "#fff", fontWeight: 'bold' }}>Title : {titleName}</Text>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 10, color: "#fff", fontWeight: 'bold', marginTop: 2 }}>Artist: {albumName}</Text>
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginTop: 6 }}>

        <Text style={{ fontSize: 12, color: "#fff", fontWeight: 'bold', }}>Status: </Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: item.show.status == 'Active' ? '#fff' : 'yellow' }}> {item.show.status}</Text>

      </View> */}


                  </View>
                </View>

              </View>
            </View>

          </View>
        </View>
      </View>










      <View style={{ marginTop: 10, paddingHorizontal: 10, alignSelf: 'center' }}>
        <Searchbar
          style={{
            borderRadius: 0,
            color: '#031489',
            borderColor: '#031489',
            borderWidth: 1,
            borderRadius: 0,
            height: 35,
            width: '100%'
          }}
          placeholder="Search Album"
          placeholderTextColor="#031489"
          autoCapitalize="none"
          iconColor="#031489"
          onChangeText={(text) => searchFilterFunction(text)}
          inputStyle={{ fontSize: 12, color: '#031489' }}
        />
      </View>
      {filterData.length == 0 ?

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={Nodata} style={{ width: 130, height: 130, tintColor: '#031489' }} />

          {/* <Text style={{ fontSize: 18 , color:"#000"}}>No data found</Text> */}

        </View> :
        <ScrollView contentContainerStyle={{ flexGrow: 1, flex: 1 }}>
          <View style={{ marginTop: 20, paddingHorizontal: 5, }}>
            <FlatList
              data={filterData}
              renderItem={_reviewitem}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>}
      <DownMusicBar />
      {process == true &&
        <Loading />
      }
    </SafeAreaView>
  );
}
