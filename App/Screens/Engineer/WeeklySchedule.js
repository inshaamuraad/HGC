import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../../../Assets/css/style';
import Icon from 'react-native-vector-icons/Feather';
import AppServices from '../../Server/AppServices';
import DropDownPicker from 'react-native-dropdown-picker';
import Nodata from '../../../Assets/Icons/noData.png'
import comment from '../../../Assets/Icons/CommentT.png'
import Moment from 'moment';
import Ionicons from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/core';
import Loading from '../../Components/Loading'
import { useRoute } from '@react-navigation/native';
import DownArrow from 'react-native-vector-icons/Feather';

export default function WeeklySchedule({ route }) {

  const navigation = useNavigation()
  const { params } = route
  const routee = useRoute();
  const [hostAlbums, setHostAlbums] = useState([])
  const [process, setprocess] = useState(false)
  const [name, setname] = useState('')
  const [url, seturl] = useState('')
  const [slug, setslug] = useState('')
  const [email, setemail] = useState('')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [id, setid] = useState('')
  const [chechVerify, setchechVerify] = useState(false)
  const [ScheduleData, setScheduleData] = useState([])
  const [commentsData, setcommentsData] = useState([])
  useEffect(() => {
    getAlbumsCatelog();
  }, [])

  const getAlbumsCatelog = async () => {
    setprocess(true)
    let temp = [];

    const Storage = new AppServices();
    var res = await Storage.getHostIndivitual(params.id);
    try {
      if (res.data.data) {
        let indivitualData = res.data.data
        let albumData = res.data.data.schedules
        let length = albumData.length
        if (length > 0) {
          albumData.map((item) => {
            temp.push({
              label: item.day,
              value: item.day

            })
          })
          const arrayData = [...new Map(temp.map(item => [JSON.stringify(item), item])).values()];
          setScheduleData(arrayData)
        }
        setHostAlbums(albumData)
        setcommentsData(indivitualData.comments)
        setid(indivitualData.host.id)
        setname(indivitualData.host.name)
        setemail(indivitualData.host.email)
        seturl(indivitualData.host.avatar_url)
        setslug(indivitualData.host.slug)


      }
    } catch (err) {
      setprocess(false)
      console.log(err)
    }

    setprocess(false)
  }

  const _reviewitemm = ({ item }) => {

    if (item == "1") {
      return (
        <View style={{ paddingVertical: 10 }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image source={Nodata} style={{ width: 130, tintColor: '#fff', height: 130 }} />
          </View>
        </View>
      )

    } else {
      return (
        <TouchableOpacity style={{
          paddingHorizontal: 15, height: 35, backgroundColor: "transparent", borderRadius: 20,
          marginTop: 10,
          flexDirection: "row",
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: "#fff",
          borderWidth: 1
        }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: "#CB3BF7", paddingVertical: 5 }}>{item.show.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <Icon name="arrow-down-right" size={10} color="green" />
            <Text style={{ fontSize: 8, fontSize: 10, color: '#CB3BF7' }}>{item.from_time}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <Icon name="arrow-up-left" size={10} color="red" />
            <Text style={{ fontSize: 8, fontSize: 10, color: '#CB3BF7' }}>{item.to_time}</Text>
          </View>
        </TouchableOpacity>
      )
    }

  }


  const _reviewitem = ({ item, index }) => {
    if (item.day == value) {
      return (
        <FlatList
          data={item.shows.length == 0 ? "1" : item.shows}
          renderItem={_reviewitemm}
          keyExtractor={item => item.id}
        />
      )
    }

  }




  const _reviewCommentitem = ({ item, index }) => {

    return (
      <View style={{ marginTop: 5 }}>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ paddingHorizontal: 4 }}>
            <Image source={comment} style={{ width: 30, height: 30, resizeMode: 'contain', tintColor: '#fff' }} />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 10, marginTop: 1, color: '#fff', fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ fontSize: 6, marginTop: 2, color: '#fff' }}>{item.email}</Text>
          </View>
        </View>

        <Text style={{ fontSize: 10, marginTop: 5, color: '#fff' }}>{item.comment}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text></Text>
          <Text style={{ fontSize: 6, marginTop: 5, color: 'yellow', right: 0, }}>{Moment(item.created_at).format('MMM hh:mm:ss')}</Text>
        </View>
        <View>

        </View>
        <View style={{ width: '100%', height: 0.7, borderWidth: 0.2, borderColor: '#9948a3', marginTop: 5 }}></View>
      </View>
    )


  }

  return (
    <SafeAreaView style={styles.body}>

      <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 20 }}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <DownArrow name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: 'bold' }}>{routee.name}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{
          paddingVertical: 30, paddingHorizontal: 10, shadowColor: '#e3e3e3',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.58,
          shadowRadius: 12.00,
          elevation: 10,
        }}>

          <Image source={{ uri: url }} style={{ width: 90, height: 90, resizeMode: 'contain' }} />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 12, marginTop: 1, color: '#fff', fontWeight: 'bold' }}>Albums : {name}</Text>
          <Text style={{ fontSize: 10, marginTop: 5, color: '#fff' }}>Email : {email}</Text>
          <Text style={{ fontSize: 10, marginTop: 5, color: '#fff' }}>Slug : {slug}</Text>

        </View>


      </View>

      <View style={[styles.weeklyContainer, { marginVertical: 20 }]}>
        <Text style={{ fontWeight: 'bold', color: '#fff' }}>WEEKLY SCHEDULE</Text>
      </View>
      <View style={{ marginVertical: 20, zIndex: chechVerify == true ? 0 : 3000, marginHorizontal: 10 }}>

        <DropDownPicker
          open={open}
          value={value}
          items={ScheduleData}
          setOpen={setOpen}
          setValue={setValue}
          zIndex={3000}
          zIndexInverse={1000}
          placeholder="Select Day"
          style={{ borderRadius: 30, height: 40 }}
          content

        />
      </View>
      <View style={[styles.columnRadius, { marginVertical: 5, marginHorizontal: 20, backgroundColor: 'transparent' }]}>
        <FlatList
          data={hostAlbums}
          renderItem={_reviewitem}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, marginHorizontal: 20, }}>
        <Text style={{ color: '#9948a3', fontWeight: 'bold' }}>Comments</Text>
      </View>
      <View style={[styles.columnRadius, { marginVertical: 5, marginHorizontal: 20, backgroundColor: 'transparent' }]}>
        <FlatList
          data={commentsData}
          renderItem={_reviewCommentitem}
          keyExtractor={item => item.id}
        />
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Comment', {
          id: id
        })}
      >
        <Ionicons name="plus" size={24} color="#fff" />
      </TouchableOpacity>
      {process == true &&
        <Loading />
      }
    </SafeAreaView>

  );
}
