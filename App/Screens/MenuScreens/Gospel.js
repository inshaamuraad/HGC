import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import TopMenu from '../../Components/TopMenu';
import styles from '../../../Assets/css/style';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Entypo';
import Header from '../../Components/Header';
import LinearGradient from 'react-native-linear-gradient';


export default function Gospel() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
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

        <View style={{
          
          shadowOffset: {
            width: 0,
            height: 15,
            borderRadius: 99
          },
          shadowOpacity: 0.20,
          shadowRadius: 10.00,
          elevation: 50, shadowColor: '#e7e7e7'
        }}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingHorizontal: 20, backgroundColor: "#e1e1e1", borderRadius: 10, marginTop: 10, paddingVertical: 10, }} colors={['#CB3BF7', '#ff0065',]}>
            <Text style={{ paddingHorizontal: 10, color: '#000' }}>{item.title}</Text>
          </LinearGradient>
        </View>
      )
    }

  }



  return (
    <SafeAreaView style={styles.body}>
      <View style={{ paddingVertical: 10 }}>
        <Header />
      </View>

      <View style={{ paddingHorizontal: 20, paddingVertical: 10, zIndex: 3000, borderRadius: 20 }}>

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          zIndex={3000}
          PlaceholderTextColor="#fff"
          placeholder="Pick Name"
          style={{ borderRadius: 30, backgroundColor: '#4F1769',tintColor:'#ffffff' }}
        
        />
      </View>
      <View style={{ marginVertical: 20, paddingHorizontal: 15 }}>
        <FlatList
          data={Data}
          renderItem={_reviewitem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
