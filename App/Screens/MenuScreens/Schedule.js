import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import TopMenu from '../../Components/TopMenu';
import styles from '../../../Assets/css/style';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Entypo';
import AppServices from '../../Server/AppServices';
import Header from '../../Components/Header';
import LottieView from 'lottie-react-native';
import Loading from '../../Components/Loading';
import { useIsFocused } from '@react-navigation/core';
import DownMusicBar from '../../Components/DownMusicBar';
export default function Schedule() {
  const focus = useIsFocused()
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [process, setprocess] = useState(false)
  const [ScheduleData, setScheduleData] = useState([])
  const [items, setItems] = useState([])




  useEffect(() => {
    focus &&  getScheduleDataa();
  }, [focus])

  const getScheduleDataa = async () => {
    setprocess(true)
    let temp = [];
    const Storage = new AppServices();
    var res = await Storage.getSchedule();
    try {
      if (res.data) {
        let albumData = res.data.data.schedules
        let length = albumData.length
        if (length > 0) {
          albumData.map((item) => {
            temp.push({
              label: item.day_name,
              value: item.day_name
            })
          })
          const arrayData = [...new Map(temp.map(item => [JSON.stringify(item), item])).values()];
          setScheduleData(arrayData)
        }
        setItems(albumData)
        setprocess(false)


      }
    } catch (err) {
      setprocess(false)
      console.log(err)
    }

    setprocess(false)
  }


  const _reviewitem = ({ item, index }) => {

    if (item.day_name == value) {
      return (
        <FlatList
          data={item.shows.length == 0 ? "1" : item.shows}
          renderItem={_reviewitemm}
          keyExtractor={item => item.id}
        />
      )
    }

  }

  const _reviewitemm = ({ item, index }) => {
    if (item == "1") {
      return (
        <View style={{ paddingVertical: '50%' }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LottieView source={require('../../../Assets/Lottie/noDataa.json')} style={{ width: 150, height: 150 }} autoPlay loop />
          </View>
        </View>
      )

    } else {
      return (

        <View style={{
          marginVertical: 10, height: 100, backgroundColor: "#fff", borderRadius: 0, marginTop: 10,
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.40,
          shadowRadius: 9.00,
          marginHorizontal: 5,
          elevation: 4,
        }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, borderWidth: 1, paddingVertical: 5, borderColor: "#031489", backgroundColor: "#031489", justifyContent: "center", alignItems: 'center' }}>
              <Text style={{ color: '#fff' }}>Show</Text>
            </View>
            <View style={{ flex: 3, borderBottomWidth: 1, borderColor: "#031489", justifyContent: "center", alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: "#031489" }}>{item.day}</Text>
            </View>

          </View>
          <View>

            <Image style={{ height: 80, }} source={{ uri: item.host.avatar_url }} />
            <View style={{
              position: 'absolute', backgroundColor: '#0009',
              height: 80,
              width: '100%'


            }}>
              <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text style={{ fontSize: 16, color: "#fff", fontWeight: 'bold' }}>{item.show.name}</Text>
                <Text style={{ fontSize: 12, color: "#fff", fontWeight: 'bold', marginTop: 2 }}>Timing: {item.from_time} - {item.to_time}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, color: "#fff", fontWeight: 'bold', marginTop: 2 }}>Artist: {item.host.name}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 6 }}>

                    <Text style={{ fontSize: 12, color: "#fff", fontWeight: 'bold', }}>Status: </Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: item.show.status == 'Active' ? '#fff' : 'yellow' }}> {item.show.status}</Text>

                  </View>


                </View>
              </View>

            </View>
          </View>

        </View>


      )
    }
  }




  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingVertical: 10 }}>
          <Header />
        </View>
        {/* <View style={[styles.weeklyContainer]}>
          <Text style={{ fontWeight: 'bold', color: '#fff' }}>WEEKLY SCHEDULE</Text>
        </View> */}
        <View style={{ paddingHorizontal: 10, paddingVertical: 10, zIndex: 3000 }}>
          <View style={{ flex: 1, paddingHorizontal: 5, zIndex: 1000 }}>
            <DropDownPicker
              listMode='MODAL'
              open={open}
              value={value}
              items={ScheduleData}
              setOpen={setOpen}
              setValue={setValue}
              placeholder="Select Day"
              zIndex={3000}
              zIndexInverse={1000}
              dropDownContainerStyle={{ backgroundColor: 'white', zIndexInverse: 2000, zIndexInverse: 2000 }}
              autoCapitalize='none'
            />
          </View>

        </View>

        

          <View style={[styles.columnRadius, { marginVertical: 20, marginHorizontal: 5 }]}>
           {value ?
            <FlatList
              data={items}
              renderItem={_reviewitem}
              keyExtractor={item => item.id}
            />
         
          :
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LottieView source={require('../../../Assets/Lottie/no.json')} style={{ width: 180, height: 180 }} autoPlay loop />
        
          </View>
          }
          </View>
         

      </ScrollView>
      <DownMusicBar />

      {process == true &&
        <Loading />
      }
    </SafeAreaView>
  );
}
