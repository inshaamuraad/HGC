import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from '../../../Assets/css/style';
import AppServices from '../../Server/AppServices';
import Loading from '../../Components/Loading';
import LottieView from 'lottie-react-native';

export default function IndivitualSong({ navigation }) {

  const [albums, setalbums] = useState([])
  const [process, setprocess] = useState(false)

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


      }
    } catch (err) {
      setprocess(false)
      console.log(err)
    }

    setprocess(false)


  }

  const renderItem = ({ item }) => {
    setprocess(false)
    return (
      <View style={{ margin: 5, }}>
        <TouchableOpacity style={styles.engineerContianer} onPress={() => navigation.navigate('BuyAlbum', {
          title: item.title,
          url: item.image_url,
          artist: item.artist_name,
          id: item.id
        })} >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: item.image_url }} style={{ width: 180, height: 110, resizeMode: 'contain' }} />
          </View>
          <View style={{ paddingVertical: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 2 }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 10, marginTop: 2 }}>Albums : {item.artist_name}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 2 }}>Biography : <Text style={{ fontSize: 10, fontWeight: '300' }}>{item.details}... <Text style={{ color: "red" }} onPress={() => navigation.navigate('BuyAlbum', {
              title: item.title,
              url: item.image_url,
              artist: item.artist_name,
              id: item.id
            })}>View</Text></Text></Text>
          </View>
        </TouchableOpacity>
      </View>

    )
  }

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "#0009" }}
        contentContainerStyle={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >

        <View style={[styles.SearchContainer, { marginTop: 30 }]}>
          <TextInput placeholder="Search"
            placeholderTextColor="#fff"
            style={{ color: "#fff" }} />
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 10, marginVertical: 10 }}>
          <FlatList
            data={albums}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>

        {process == true &&
          <Loading />
        }
      </ScrollView>
    </SafeAreaView>
  );
}
