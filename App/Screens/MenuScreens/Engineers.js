import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import TopMenu from '../../Components/TopMenu';
import styles from '../../../Assets/css/style';
import DownMusicBar from '../../Components/DownMusicBar';
import Header from '../../Components/Header';
import AppServices from '../../Server/AppServices';
import { Searchbar } from 'react-native-paper';
import Loading from '../../Components/Loading';
import { useIsFocused } from '@react-navigation/core';

export default function Engineers({ navigation }) {
  const [search, setSearch] = useState('');
  const [albums, setalbums] = useState([])
  const [process, setprocess] = useState(false)
  const [filterData, setFilterData] = useState([])
  const focus = useIsFocused()

  useEffect(() => {
    focus && getAlbumsCatelog();
  }, [focus])
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

  return (
    <SafeAreaView style={styles.body}>
      <View style={{ paddingVertical: 10 }}>
        <Header />
      </View>
      <View style={{ marginTop: 30, paddingHorizontal: 10, alignSelf: 'center' }}>
        <Searchbar
          style={styles.SearchContainer}
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
          <Text style={{ fontSize: 18 }}>No data found</Text>

        </View> :
        <View style={{ marginTop: 50, marginHorizontal: 15, }}>
          <FlatList
            data={filterData}
            numColumns={4}
            columnWrapperStyle={{ justifyContent:'flex-start'}}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>}

      <DownMusicBar />

      {process == true &&
        <Loading />
      }
    </SafeAreaView>
  );
}
