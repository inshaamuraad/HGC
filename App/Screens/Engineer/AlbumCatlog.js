import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from '../../../Assets/css/style';
import AppServices from '../../Server/AppServices';
import Loading from '../../Components/Loading';
import { Searchbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import music from '../../../Assets/Images/musicRock.jpeg'
import Album from '../../../Assets/Images/album.png'

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
      <View>
        <TouchableOpacity style={{
          width: 120, height: 120, backgroundColor: '#000', borderRadius: 10, marginVertical: 10, justifyContent: 'center', alignItems: 'center', shadowColor: '#ff0065',
          shadowOffset: {
            width: 0,
            height: 20,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.00,
          elevation: 24
        }} onPress={() => navigation.navigate('BuyAlbum', {
          title: item.title,
          url: item.image_url,
          artist: item.artist_name,
          id: item.id,
          purchase_url: item.purchase_url
        })}>
          <Image source={{ uri: item.image_url }} style={{ height: 110, width: 110, borderRadius: 10, }} />
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 999, backgroundColor: '#000', position: 'absolute', justifyContent: 'center', alignItems: 'center', right: 0, bottom: -5,shadowColor: '#ff0065',
          shadowOffset: {
            width: 0,
            height: 20,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.00,
          elevation: 24 , borderColor:'#CB3BF7', borderWidth:1}}
          onPress={() => navigation.navigate('Sell Album')}>
          <Text style={{ fontSize: 9, color: '#CB3BF7' , fontWeight:'bold'}}>   Sell Album</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={{ fontSize: 7, color: '#fff', alignSelf: 'center', marginTop: 12 }}>{item.title}</Text>
        <Text style={{ fontSize: 9, color: '#CB3BF7', alignSelf: 'center', marginTop: 5 }}>{item.artist_name}</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "#0009" }}
        contentContainerStyle={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ width: '100%', height: 200 }}>
          <Image source={music} style={{ width: '100%', height: 200 }} />
          <View style={{ width: '100%', height: 200, position: "absolute", backgroundColor: "#0009" }}>
          </View>
          <View style={{ marginTop: 30, paddingHorizontal: 50, position: "absolute", }}>
            <Searchbar
              style={styles.SearchContainer}
              placeholder="Search Album"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              iconColor="#fff"
              onChangeText={(text) => searchFilterFunction(text)}
              inputStyle={{ fontSize: 12, color: '#fff' }}
            />
          </View>
          <View style={{
            width: 50, height: 50, borderRadius: 99, backgroundColor: '#000', position: "absolute", bottom: -20, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', shadowColor: '#ff0065',
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,
            elevation: 24,
          }}>
            <LottieView source={require('../../../Assets/Lottie/Heart.json')} style={{ width: 30, height: 30 }} autoPlay loop />

          </View>
        </View>
        {filterData ? <View style={{ marginTop: 20, paddingHorizontal: 5, marginVertical: 10 }}>
          <Text style={{ paddingHorizontal: 15, fontSize: 16, fontWeight: 'bold', paddingVertical: 10 }}>Albums Catelog</Text>
          <FlatList
            data={filterData}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-around' }}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
          :
          <View> <Text>No data</Text> </View>}
        {process == true &&
          <Loading />
        }
      </ScrollView>
    </SafeAreaView>
  );
}
