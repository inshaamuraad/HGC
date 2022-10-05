import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, Dimensions, ImageBackground, ScrollView } from 'react-native';
import TopMenu from '../../Components/TopMenu';
import styles from '../../../Assets/css/style';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Entypo';
import Header from '../../Components/Header';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../../Components/Loading';
import { useIsFocused } from '@react-navigation/core';
import TimedSlideshow from 'react-native-timed-slideshow';
import LottieView from 'lottie-react-native';
import { ImageSlider } from "react-native-image-slider-banner";
import DownMusicBar from '../../Components/DownMusicBar';
import AdvertiseList from '../../Components/AdvertiseList';
import ImageLogo from '../../../Assets/Images/hgc.jpeg'

export default function Gospel() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [process, setprocess] = useState(false)
  const [close, setclose] = useState(false)
  const win = Dimensions.get('window');
  const ratio = win.width / 541; //541 is actual image width
  const [items, setItems] = useState([
    { label: 'Halelujah Glospel Globally', value: '0' },
    { label: 'Gospel Pipeline', value: '1' },
    { label: 'Gospel Store', value: '2' },
    { label: 'Gospel Scroll Pages(Social Media) ', value: '3' },
    { label: 'Gospel Classified', value: '4' },
    { label: 'Gospel Forum', value: '5' },
    { label: 'Gospel Shopping & Coaching Tips', value: '6' },
    { label: 'Gospel Printing', value: '7' },
    { label: 'Gospel Templates ', value: '8' },
    { label: 'Gospel Sing Along ', value: '9' }
  ])
  function EmptySpace() {
    return (
      <>
        <View style={{ height: 0, width: 0 }}>
        </View>
      </>
    )
  }
  const itemss = [
    {
      uri: "https://hgcradio.org/public/front/images/radio-banner.jpg",

    },
    {
      uri: require('../../../Assets/Images/black.jpeg'),
      title: "Advertise Here !!",
      text: "EMAIL US, radio@hallelujahgospel.com",
    },

  ]
  const Data = [
    {
      id: 0,
      title: "This will lets you explore seamlessly the exciting array of Gospel music, events, news, Biblical truths, people, interactions, projects, concepts, and efforts while giving you a glimpse of what Hallelujah Gospel is behind the name.",

    },
    {
      id: 1,
      title: "Are you in search of better-quality faith-building videos? This is the venue to stream family-friendly videos or make one yourself. Watch and share top videos and inspiring movies or upload your own Christian-themed content."
    },
    {
      id: 2,
      title: "Shop smarter at Hallelujah Gospel Online. Enjoy irresistible prices and exclusive deals. Discover a wider selection of top-grade goods. Take delight in terrific gift ideas for a variety of occasions. Save more on bundled products. Browse personalized promotional merchandise."
    },
    {
      id: 3,
      title: "If you’re ready for something different, what we are offering is the best new alternative to social media as we know it. We’ve made Scroll Pages like a breath of fresh air – with less ad targeting and more secure sharing so that you can communicate with the people in your life in every sense of the word."
    },
    {
      id: 4,
      title: "Hallelujah Classifieds promises to find the perfect match for the ad you are looking for and to house your next cost-free campaign with only a few clicks of the mouse. This is the ultimate marketplace to advertise or check out location-based listings for practically everything you need. If you want to connect with prospective clients or just get the word out about your company, you can’t go wrong with Hallelujah Classifieds."
    },
    {
      id: 5,
      title: "Our Gospel Forum is a wonderful avenue for you to connect and find fellowship with like-minded individuals. We have numerous forums, sub forums and several topics that will encourage you and meet your need for a supportive community no matter where you are in your Christian walk."
    }, {
      id: 6,
      title: "This is another knowledge-sharing tool on Hallelujah Gospel featuring a user-friendly interface, broad topical categories and simplified process throughout. Our community-powered Q&A lets you ask questions and get quality answers, or answer other users’ questions posted here based on either facts or your opinion."
    }, {
      id: 7,
      title: "Gospel Printing has all your custom printing needs in one convenient location, plus we’ve got your CD duplication and replication covered with the fastest turnaround time. We are focused on your image and able to serve as a true partner in producing highly satisfactory work."
    }, {
      id: 8,
      title: "Create a professional website for your business or church without paying anything. Hallelujah Gospel has hundreds (and counting) of stunning templates you can customize to your heart's content. Domain name, web hosting and e-commerce solutions are also available for next to nothing with our premium plans."
    }, {
      id: 9,
      title: "This web conferencing platform makes your online meetings as good as face-to-face communications. We’ve redefined the process of hosting and joining so that everything is simple and straightforward. Connect seamlessly with anybody in the world in the comfort of your preferred location to launch your conference or group discussion, or just catch up with family and friends blissfully."
    },
  ]



  const _reviewitem = ({ item }) => {

    if (item.id == value) {

      return (

        <ImageBackground source ={ImageLogo} 
        
        
        style={{
          borderWidth: 1,
          borderColor: '#031489',
          elevation: 20,
          borderRadius: 0,
          marginHorizontal: 2, marginVertical: 20,
          
          

        }}>
          <View style={{  borderRadius: 0,backgroundColor:'#0009',  paddingVertical: 10, }} >
            <Text style={{ width : '100%',paddingHorizontal: 10, color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
          </View>
        </ImageBackground>
      )
    }

  }



  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, flex: 1 }}>
        <View style={{ paddingVertical: 10 }}>
          <Header />
        </View>
        <View style={{ paddingHorizontal: 5, zIndex: 1000, margin: 10 }}>
          <DropDownPicker
            listMode='MODAL'
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Pick Name"

            zIndex={3000}
            zIndexInverse={1000}
            dropDownContainerStyle={{ backgroundColor: 'white', zIndexInverse: 2000, zIndexInverse: 2000 }}
            autoCapitalize='none'
          />
        </View>



        {value ?

          <View style={{ marginVertical: 20, paddingHorizontal: 15, margin: 10 }}>
            <FlatList
              data={Data}
              renderItem={_reviewitem}
              keyExtractor={item => item.id}
            />
          </View>
          :
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LottieView source={require('../../../Assets/Lottie/lf30_editor_jqrsupgs.json')} style={{ width: 180, height: 180 }} autoPlay loop />
            <Text style={{ fontSize: 16, color: "#000" }}>No data found</Text>

          </View>}


        {process == true &&
          <Loading />
        }

      </ScrollView>
      <Text style={[styles.Text, { fontWeight: 'bold', color: "#031489", fontSize: 13, marginTop: 20, marginLeft: 20 , paddingVertical: 20}]}>GOSPEL PLATFORMS</Text>
      <AdvertiseList />

      <DownMusicBar />


    </SafeAreaView>
  );
}
