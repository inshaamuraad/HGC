import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from '../../../Assets/css/style';
import AppServices from '../../Server/AppServices';
import Loading from '../../Components/Loading';
import { Searchbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import music from '../../../Assets/Images/seel.webp'
import Album from '../../../Assets/Images/album.png'
import Icon from 'react-native-vector-icons/FontAwesome';

import LottieView from 'lottie-react-native';

export default function AlbumCatlog({ navigation }) {

  const [search, setSearch] = useState('');
  const [albums, setalbums] = useState([])
  const [process, setprocess] = useState(false)
  const [filterData, setFilterData] = useState([])

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
        console(filterData.length)
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
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(albums);
      setSearch(text);

    }
  };

  const renderItem = ({ item }) => {
    setprocess(false)
    return (
      <View style={{ marginBottom: 5 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{
            height: 130, width: 220, justifyContent: 'center', alignItems: 'center', marginVertical: 20
          }} onPress={() => navigation.navigate('BuyAlbum', {
            title: item.title,
            url: item.image_url,
            artist: item.artist_name,
            id: item.id,
            purchase_url: item.purchase_url
          })}>
            <Image source={{ uri: item.image_url }} style={{ height: 130, width: 200, alignSelf: 'center' }} />
            <TouchableOpacity style={{
              borderRadius: 999, position: 'absolute', justifyContent: 'center', alignItems: 'center', right: 20, bottom: -1,


            }}
              onPress={() => navigation.navigate('Sell Album')}>
              {/* <Text style={{ fontSize: 9, color: '#CB3BF7', fontWeight: 'bold' }}>   Sell Album</Text> */}
              <Image source={music} style={{ height: 40, width: 40, }} />

            </TouchableOpacity>

          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 11, color: '#000', marginTop: 5, fontWeight: 'bold', paddingLeft: 20 }}>{item.title}</Text>
        <Text style={{ fontSize: 12, color: '#031489', paddingLeft: 20, fontWeight: 'bold', marginVertical: 5 }}>{item.artist_name}</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "#fff" }}
        contentContainerStyle={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row', paddingLeft: 30, paddingVertical: 30, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.pop()} style={{ width: 40 }}>
            <Icon name="arrow-left" size={20} color="#031489" />
          </TouchableOpacity>
          <View style={{ marginHorizontal: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'tranparent' }}>
            <Searchbar
              style={{
                borderRadius: 50,
                backgroundColor: 'transparent',
                color: '#031489',
                borderColor: 'grey',
                borderWidth: 1,
                height: 35,
                width: 310,
                justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
              }}
              placeholder="Search Album"
              placeholderTextColor="#031489"
              autoCapitalize="none"
              iconColor="#031489"
              onChangeText={(text) => searchFilterFunction(text)}
              inputStyle={{ fontSize: 12, color: '#031489', }}
            />
          </View>
        </View>
        <View style={{ width: '100%', height: 200 }}>
          <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOcbF__pIar2CO4qfOnb3vkYf1hkri8WqSDg&usqp=CAU" }} style={{ width: '100%', height: 200 }} />
          <View style={{ width: '100%', height: 200, position: "absolute", backgroundColor: "#000000aa" }}>
          </View>
          <View style={{ marginTop: 30, paddingHorizontal: 10, position: "absolute", justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <LottieView source={require('../../../Assets/Lottie/radiio.json')} style={{ width: 100, height: 100 }} autoPlay loop />
              <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', paddingHorizontal: 20 }}>Explore your favourite music</Text>
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', }}>with Hallelujah !! </Text>

              </View>
            </View>
          </View>

        </View>
        {filterData.length == 0 ?

          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LottieView source={require('../../../Assets/Lottie/no.json')} style={{ width: 180, height: 180 }} autoPlay loop />

          </View> :
          <View style={{ marginTop: 0, }}>
            <View style={{ marginHorizontal: 2, }}>
              <FlatList
                data={filterData}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-evenly', }}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>}
        {process == true &&
          <Loading />
        }
      </ScrollView>
    </SafeAreaView>
  );
}
