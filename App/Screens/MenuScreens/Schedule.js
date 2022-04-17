import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import TopMenu from '../../Components/TopMenu';
import styles from '../../../Assets/css/style';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Entypo';
import AppServices from '../../Server/AppServices';
import Header from '../../Components/Header';
import LottieView from 'lottie-react-native';

export default function Schedule() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [process, setprocess] = useState(false)
  const [ScheduleData, setScheduleData] = useState([])
  const [items, setItems] = useState([])




  useEffect(() => {
    getScheduleDataa();
  }, [])

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
    if(item == "1"){
      return(
        <View style={{paddingVertical: '50%'}}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
           <LottieView source={require('../../../Assets/Lottie/noData.json')} style={{ width: 150, height: 150 }} autoPlay loop />
        </View>
        </View>
      )

    }else{
      return (

        <View style={{ paddingHorizontal: 9,marginVertical:10, height: 70, backgroundColor: "#000", borderRadius: 10, marginTop: 10, 
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.40,
        shadowRadius: 9.00,
        elevation: 50, shadowColor: '#CB3BF7' }}>
          <View style={[styles.column, { flexDirection: "row", backgroundColor: "#000", paddingVertical: 5 }]}>
            <Text style={{ fontSize: 13, color: "#CB3BF7", fontWeight: 'bold' }}>{item.show.name}</Text>
            <View style={{}}>
            <Text style={{ fontSize: 10 ,color: "#CB3BF7"}}>Timing: {item.from_time} - {item.to_time}</Text>
            </View>

          </View>

          <View style={{ marginTop: 1 }}>
            <Text style={{ fontSize: 10 ,color: "#fff"}}>Days: {item.day}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{ paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 8, color: "#fff" }}>Artist: {item.host.name}</Text>
          </View>
          <View style={{flexDirection: 'row',}}>

            <Text style={{ fontSize: 10 ,color: "#fff"}}>Status: </Text>
            <Text style={{ fontSize: 10 , color: item.show.status == 'Active'? 'green' : 'red' }}> {item.show.status}</Text>

            </View>


          </View>
        </View>


      )
      }
  }




  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={{ paddingVertical: 10 }}>
        <Header />
      </View>
      <View style={[styles.weeklyContainer]}>
        <Text style={{ fontWeight: 'bold', color: '#fff' }}>WEEKLY SCHEDULE</Text>
      </View>
      <View style={{ paddingHorizontal: 10, paddingVertical: 10, zIndex: 3000 }}>

        <DropDownPicker
          open={open}
          value={value}
          items={ScheduleData}
          setOpen={setOpen}
          setValue={setValue}
          zIndex={3000}
          placeholder="Select Day"
          style={{borderRadius: 30}}
          searchable
        />
      </View>
      <View style={[styles.columnRadius, { marginVertical: 20, marginHorizontal: 5 }]}>
        <FlatList
          data={items}
          renderItem={_reviewitem}
          keyExtractor={item => item.id}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
