import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from '../../../Assets/css/style';
import TopMenu from '../../Components/TopMenu';
import DownMusicBar from '../../Components/DownMusicBar';
import AppServices from '../../Server/AppServices';
import Header from '../../Components/Header'
import Loading from '../../Components/Loading';
import TimedSlideshow from 'react-native-timed-slideshow';
import { Searchbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
export default function History() {
  const [getHistoryData, setgetHistoryData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [process, setprocess] = useState(false)
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

  const _reviewitem = ({ item }) => {

    return (
      <View>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#000', '#000',]}
            style={{
                paddingVertical: 5, marginTop: 5, borderRadius: 7, paddingHorizontal: 10, shadowOffset: {
                    width: 0,
                    height: 15,
                },
                shadowOpacity: 0.60,
                shadowRadius: 15.00,
                elevation: 10, shadowColor: '#000'
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', }}>
                    <Image source={{ uri: item.image }} style={{ width: 90, height: 90, borderRadius: 5,resizeMode:'contain', backgroundColor:'#000'  }} />
                    <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                        <Text style={[styles.Text, { fontSize: 14, color: '#CB3BF7' }]}>{item.title}</Text>
                        <Text style={[styles.Text, { fontSize: 8, }]}>{item.artist}</Text>
                <Text style={{ fontSize: 7, color: '#fff', marginTop:5 }}>Play_At: {moment(item.play_at, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY").toString()}</Text>

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
      <View style={{
        width: '90%', height: 200, paddingBottom: 0, borderRadius: 20, marginTop: 20, borderRadius: 25, shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 60, shadowColor: '#ff0065', alignSelf: 'center'
      }}>
        <TimedSlideshow
          items={items}
          renderCloseIcon={null}
          renderCloseIcon={EmptySpace}
          extraSpacing={0}
          showProgressBar={null}
               footerStyle={{ borderRadius: 0,  }}
               renderFooter={EmptySpace}
        ></TimedSlideshow>
        <View style={{
          position: 'absolute', backgroundColor: 'transparent', 
          height: 200,
          width: '100%',
        }}>
        
        </View>

      </View>
      <View style={{ marginTop: 30, paddingHorizontal: 10, alignSelf:'center' }}>
        <Searchbar
          style={{  borderRadius: 0,
            backgroundColor: 'transparent',
            color: '#fff',
            borderColor: 'grey',
            borderWidth: 1,
            borderRadius: 0,
            height:35,
            width: 300}}
          placeholder="Search Album"
          placeholderTextColor="#fff"
          autoCapitalize="none"
          iconColor="#fff"
          onChangeText={(text) => searchFilterFunction(text)}
          inputStyle={{ fontSize: 12, color: '#CB3BF7' }}
        />
      </View>

      <View style={[styles.columnRadius, { marginVertical: 20, marginHorizontal: 5 }]}>
        <FlatList
          data={filterData}
          renderItem={_reviewitem}
          keyExtractor={item => item.id}
        />
      </View>
      <DownMusicBar />
      {process == true &&
        <Loading />
      }
    </SafeAreaView>
  );
}
