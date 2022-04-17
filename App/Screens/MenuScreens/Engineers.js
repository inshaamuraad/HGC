import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import TopMenu from '../../Components/TopMenu';
import styles from '../../../Assets/css/style';
import DownMusicBar from '../../Components/DownMusicBar';
import Header from '../../Components/Header';
import AppServices from '../../Server/AppServices';
import { Searchbar } from 'react-native-paper';
import Loading from '../../Components/Loading';
export default function Engineers({ navigation }) {
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
    var res = await Storage.getHost();
    try {
      if (res.data) {
        let albumData = res.data.data
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
      let newData = albums.filter(function (str) { return ((str.name).toUpperCase()).includes(_text); });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(albums);
      setSearch(text);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <View style={{ margin: 10, }}>
        <TouchableOpacity style={{height: 100, width: 100, borderRadius: 99, alignSelf: 'center',borderColor:'#4F4C4D',borderWidth:2 ,shadowOffset: {
            width: 0,
            height: 15,
            borderRadius: 99
          },
          shadowOpacity: 0.40,
          shadowRadius: 10.00,
          elevation: 50, shadowColor: '#CB3BF7'}} onPress={() => navigation.navigate('WeeklySchedule', {
          id: item.id
        })}>
          <Image source={{ uri: item.avatar_url }} style={{ height: 98, width: 98, borderRadius: 99}} />
        </TouchableOpacity>
          <Text style={{ fontSize: 11, color: '#CB3BF7', alignSelf: 'center', marginTop: 15 }}>{item.name}</Text>
          <Text style={{ fontSize: 10, color: '#CB3BF7', alignSelf: 'center',marginTop: 5 }}>{item.email}</Text>
          <Text style={{ fontSize: 9, color: '#CB3BF7', alignSelf: 'center', marginTop: 5 }}>{item.slug}</Text>

     
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.body}>
      <View style={{ paddingVertical: 10 }}>
        <Header />
      </View>
      <View style={{ marginTop: 30, paddingHorizontal: 30,alignSelf:'center' }}>
        <Searchbar
          style={styles.SearchContainer}
          placeholder="Search Album"
          placeholderTextColor="#fff"
          autoCapitalize="none"
          iconColor="#fff"
          onChangeText={(text) => searchFilterFunction(text)}
          inputStyle={{ fontSize: 12, color: '#CB3BF7' }}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={filterData}
          numColumns={2}
          columnWrapperStyle={{ justifyContent:'space-around' }}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      {process == true &&
        <Loading />
      }
    </SafeAreaView>
  );
}
