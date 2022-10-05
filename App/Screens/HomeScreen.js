
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Play from 'react-native-vector-icons/AntDesign';
import Carousel from 'react-native-snap-carousel';
import styles from '../../Assets/css/style';
import { useIsFocused } from "@react-navigation/native";
import AppServices from '../Server/AppServices';
import { Searchbar } from 'react-native-paper';
import ImageLogo from '../../Assets/Images/hgc.jpeg'
import { ImageSlider } from "react-native-image-slider-banner";
import DashBoardList from '../Components/DashBoardList';


export default function HomeScreen({ navigation }) {

  const isFocused = useIsFocused();
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [albums, setalbums] = useState([])
  const [albumss, setalbumss] = useState([])
  const [refresh, setrefresh] = useState(true)
  const [filterData, setFilterData] = useState([])
  const [filterDatta, setFilterDatta] = useState([])
  const [filterDataa, setFilterDataa] = useState([])
  const [titleName, settitleName] = useState('')
  const [process, setprocess] = useState(false)
  const [slug, setslug] = useState('')
  const [albumName, setalbumName] = useState('')
  const [show, setshow] = useState(false)
  const [url, seturl] = useState('')
  const [textImage, settextImage] = useState('')
const [imageTitle, setimageTitle] = useState('')

const windowWidth = Dimensions.get('window').width;

  const items = [

    {
      uri: "https://hgcradio.org/public/front/imagestemplate/top-slider/radio-main-banner.jpg",
      title: "Advertise Here !!",
      text: "EMAIL US, radio@hallelujahgospel.com",

    },
    {
      uri: "https://hgcradio.org/public/front/imagestemplate/top-slider/915780baf8ae2b1.jpg",
      title: "Hallelujah Gospel Globally Radio",

    },
    {
      uri: "https://media.istockphoto.com/photos/the-musicians-were-playing-rock-music-on-stage-there-was-an-audience-picture-id1319479588?b=1&k=20&m=1319479588&s=170667a&w=0&h=bunblYyTDA_vnXu-nY4x4oa7ke6aiiZKntZ5mfr-4aM=",
      title: "Hallelujah Gospel Globally Radio",


    },

  ]

  function EmptySpace() {
    return (
      <>
        <View style={{ height: 0, width: 0 }}>
        </View>
      </>
    )
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

  useEffect(() => {
    nowPlayingSong()
  }, [])
  function EmptySpace() {
    return (
      <>
        <View style={{ height: 0, width: 0 }}>
        </View>
      </>
    )
  }

  useEffect(() => {
    getAlbumssCatelog();
  }, [])

  const getAlbumssCatelog = async () => {
    setprocess(true)
    const Storage = new AppServices();
    var res = await Storage.getApi();
    try {
      if (res.data) {
        let albumData = res.data.data.albums
        setalbums(albumData)
        setshow(true)

      }
    } catch (err) {
      setprocess(false)
      console.log(err)
    }
    setprocess(false)
  }
  const searchFilterFunction = (text) => {
    if (text) {
      let _text = text.toUpperCase()
      let newData = albums.filter(function (str) { return ((str.title).toUpperCase()).includes(_text); });
      setFilterDatta(newData);
      setshow(false)


    } else {
      setshow(true)

    }
  };

  const nowPlayingSong = async () => {
    setprocess(true)
    const Storage = new AppServices();
    var res = await Storage.getCurrentSong();
    try {
      if (res.data) {

        let albumData = res.data.data.next
        let albumDataa = res.data.data.show
        settitleName(albumData.title)
        setalbumName(albumData.artist)
        seturl(albumDataa.host_image)
        setslug(res.data.data.show.name)
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
        elevation: 60,
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

  const changeImage = (item) => {
    settextImage(item.text)
    setimageTitle(item.title)

  }

  const renderItemmm = ({ item }) => {
    setprocess(false)
    return (
      <View style={{ margin: 5, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{
          width: 100, height: 100,

        }} onPress={() => navigation.navigate('BuyAlbum', {
          title: item.title,
          url: item.image_url,
          artist: item.artist_name,
          id: item.id,
          purchase_url: item.purchase_url
        })} >
          <Image style={{ width: 100, height: 100, borderRadius: 5 }} source={{ uri: item.image_url }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 13, color: '#031489', alignSelf: 'center', marginTop: 15 }}>{item.title}</Text>
      </View>

    )
  }

  const renderItemm = ({ item }) => {
    return (
      <View
        style={{
          width: 70,
          alignItems: 'center',
          marginLeft: 6,
          paddingHorizontal: 2,
          margin: 10
        }}
      >
        <TouchableOpacity
          style={{ width: 70, height: 70 }}
          onPress={() =>
            navigation.navigate('WeeklySchedule', {
              id: item.id,
            })
          }
        >
          <Image
            source={{ uri: item.avatar_url }}
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={{ width: 67, alignSelf: 'center' }}>
          <Text style={{ fontSize: 12, color: '#031489', marginTop: 15, alignSelf:'center', fontWeight:'bold' }}>
            {item.name}
          </Text>
        </View>
      </View>
    )
  }

  const renderItem = ({ item }) => {
    setprocess(false)
    return (
      <View style={{ marginBottom: 5 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{
            height: 70, width: 70, justifyContent: 'center', alignItems: 'center', marginVertical: 20, borderRadius: 5,
          }} onPress={() => navigation.navigate('BuyAlbum', {
            title: item.title,
            url: item.image_url,
            artist: item.artist_name,
            id: item.id,
            purchase_url: item.purchase_url
          })}>
            <Image source={{ uri: item.image_url }} style={{ height: 70, width: 70, borderRadius: 5, }} />
            {/* <TouchableOpacity style={{
             borderRadius: 999, position: 'absolute', justifyContent: 'center', alignItems: 'center', right: 20, bottom: -1,

             
            }}
              onPress={() => navigation.navigate('Sell Album')}>
            <Image source={music} style={{ height: 40, width: 40, }} />

            </TouchableOpacity> */}

          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 11, color: '#000', marginTop: 5, fontWeight: 'bold', paddingLeft: 20, alignSelf: 'center' }}>{item.title}</Text>
        <Text style={{ fontSize: 11, color: '#031489', paddingLeft: 20, fontWeight: 'bold', marginVertical: 5, alignSelf: 'center' }}>{item.artist_name}</Text>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "#fff" }}
        contentContainerStyle={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >

        <View style={{ paddingLeft: 15,marginTop: 40 , flexDirection:'row', alignItems:'center'}}>
          <Image source={ImageLogo} style={{ width: 100, height: 30 }} />
          <Text style={{fontSize : 14,color :'#031489', fontWeight : 'bold', alignSelf:'center', paddingHorizontal: 12, alignItems:'center', }}>Hallelujah Gospel Choice Radio</Text>
        </View>




        <View style={{ flexDirection: 'row', paddingLeft: 30, paddingVertical: 20, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ width: 40 }}>
            <Icon name="align-right" size={20} color="#031489" />
          </TouchableOpacity>
          <View style={{ marginHorizontal: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'tranparent' }}>
            <Searchbar
              style={{
                borderRadius: 50,
                backgroundColor: 'transparent',
                color: '#031489',
                borderColor: 'grey',
                borderWidth: 1,
                height: 38,
                width: windowWidth - 100,
                justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
              }}
              placeholder="Search Album"
              placeholderTextColor="#031489"
              autoCapitalize="none"
              iconColor="#031489"
              onChangeText={(text) => searchFilterFunction(text)}
              inputStyle={{ fontSize: 14, color: '#031489', paddingTop: 4, }}
            />
          </View>
        </View>
        <View style={{
          width: '100%', height: 215, alignSelf: 'center'
        }}>
          <ImageSlider
            data={[
              {
                img: 'https://hgcradio.org/public/front/imagestemplate/top-slider/radio-main-banner.jpg',
                text: ' Hallelujah Gospel Globally Radio',
                title: 'Gospel Radio'
              },
              {
                img: 'https://hgcradio.org/public/front/imagestemplate/top-slider/915780baf8ae2b1.jpg',
                text: "Hallelujah Gospel's Worldwide Search for Anointed Praisers and Worshippers!",
                title: 'Hallelujah Gospel Globally'

              },
              {
                img: 'https://media.istockphoto.com/photos/the-musicians-were-playing-rock-music-on-stage-there-was-an-audience-picture-id1319479588?b=1&k=20&m=1319479588&s=170667a&w=0&h=bunblYyTDA_vnXu-nY4x4oa7ke6aiiZKntZ5mfr-4aM=',
                text: 'Hallelujah Gospel serves its listeners 7 styles of Gospel Music',
                title: 'Gospel Radio'

              }
            ]}
            autoPlay={true}
            onItemChanged={(item) => changeImage(item)}
            closeIconColor="#fff"
            previewImageStyle={{ width: 30, height: 30 }}
            timer={4000}
            
          />
          {/* <TimedSlideshow
            items={items}
            renderCloseIcon={EmptySpace}
            showProgressBar={null}
            footerStyle={{ borderRadius: 0, }}
            renderFooter={EmptySpace}

          ></TimedSlideshow> */}
          <View style={{
            width: '100%', height: 215, alignSelf: 'center',
            position: 'absolute', backgroundColor: "#0009", justifyContent: 'center', alignItems: 'center'
          }}>
            <View style={{alignSelf : 'center', backgroundColor:'#fff', borderWidth: 1, borderColor: '#fff', width: 70}}>
              </View>
          <Text style={{ fontSize: 10, color: '#fff', alignSelf: 'center', marginTop: 5 }}>{imageTitle}</Text>

             <View style={{ width: "96%", }}>
          <Text style={{ fontSize: 12, color: '#fff', alignSelf: 'center', marginTop: 15 , fontWeight:'bold'}}>{textImage}</Text>
        </View>

          </View>
        </View>





        {(filterDatta && show == false) &&
          <View style={{ marginTop: 0, }}>
            <View style={{ marginHorizontal: 2, alignItems: 'center', justifyContent: 'center' }}>
              <FlatList
                data={filterDatta}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={item => item.id}
              />
            </View>
          </View>}
        {show == true &&
          <View style={{ flex: 1.6 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 35 }}>
              <Text style={[styles.Text, { fontWeight: 'bold', color: "#031489" }]}>CATALOG ALBUMS</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AlbumCatlog')}>
                <Play name="right" size={20} color="#031489" />
              </TouchableOpacity>
            </View>
            {albums ? <View style={{ marginTop: 20, paddingHorizontal: 30 }}>
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
            {/* <TouchableOpacity style={{
            paddingHorizontal: 20, paddingVertical: 10, shadowOffset: {
              width: 0,
              height: 15,
            },
            shadowOpacity: 0.50,
            shadowRadius: 12.00,
            elevation: 70, shadowColor: '#fff'
          }} onPress={() => navigation.navigate('RadioLive')} >
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingHorizontal: 20, height: 50, borderRadius: 5, borderWidth: 0.5, borderColor: '#000', justifyContent: 'center', elevation: 10 }} colors={['#4F4C4D', '#ffffff00',]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 40, height: 40, borderRadius: 0 }} source={music} />
                  <View style={{ paddingHorizontal: 5, alignSelf: 'center' }}>
                    <Text style={{ color: '#FFF', fontSize: 10 }}>HAELELLUJAH GOSPEL GLOBALLY RADIO </Text>
                    <Text style={{ color: '#fff', fontSize: 10, paddingVertical: 3 }}>Live Music onAir</Text>
                  </View>
                </View>
                <Play name="playcircleo" size={20} color="#ff0065" style={{ alignSelf: 'center' }} />
              </View>
            </LinearGradient>
          </TouchableOpacity>  */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 32 }}>
              <Text style={[styles.Text, { fontWeight: 'bold', color: "#031489" }]}>NEXT PLAYING</Text>

            </View>
            <View style={{
              marginVertical: 10, height: 140, backgroundColor: "#fff", borderRadius: 0, marginTop: 10,
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.40,
              shadowRadius: 9.00,
              marginHorizontal: 15,
              elevation: 10,
            }}>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ flex: 1, borderWidth: 1, paddingVertical: 5, borderColor: "#031489", backgroundColor: "#031489", justifyContent: "center", alignItems: 'center' }}>
                  <Text style={{ color: '#fff' }}>Show</Text>
                </View>
                <View style={{ flex: 3, borderBottomWidth: 1, borderColor: "#031489", justifyContent: "center", alignItems: 'center', backgroundColor: '#e3e3e3' }}>
                  <Text style={{ fontSize: 12, color: "#031489" }}>{slug}</Text>
                </View>

              </View>
              <View>

                <Image style={{ height: 110, }} source={{ uri: url }} />
                <View style={{
                  position: 'absolute', backgroundColor: '#0009',
                  height: 110,
                  width: '100%'


                }}>
                  <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginTop: 20 }}>
                    <Text style={{ fontSize: 16, color: "#fff", fontWeight: 'bold' }}>Title : {titleName}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, color: "#fff", fontWeight: 'bold', marginTop: 2 }}>Artist: {albumName}</Text>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 35, }}>
              <Text style={[styles.Text, { fontWeight: 'bold', color: "#031489" }]}>ENGINEERS</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Engineers')}>
                <Play name="right" size={20} color="#031489" />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10, paddingHorizontal: 20, marginBottom: 10 }}>
              <FlatList
                data={filterDataa}
                horizontal={true}
                renderItem={renderItemm}
                keyExtractor={item => item.id} />
            </View>
            <Text style={[styles.Text, { fontWeight: 'bold', color: "#031489", fontSize: 13, marginTop: 20, marginLeft: 30 }]}>ADVERTISE WITH US</Text>

            <DashBoardList />
          </View>
        }
      </ScrollView>
    </View>
  );
}


