import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../../Assets/css/style';
import { useNavigation } from '@react-navigation/native';

export default function TopMenu() {
  const navigation = useNavigation();
  const [colorChange, setcolorChange] = useState(false)

  const data = [
    {
      id: 0,
      text: 'Home'
    },
    {
      id: 1,
      text: 'Play/History'
    },
    {
      id: 2,
      text: 'Schedule'
    },
    {
      id: 3,
      text: 'Engineers'
    },
    {
      id: 4,
      text: 'Gospel'
    },
    {
      id: 5,
      text: 'About'
    }, {
      id: 6,
      text: 'GuestBook'
    }, {
      id: 7,
      text: 'Contact'
    }
  ]


  const screenHandler = (label) => {
    

    if (label == 'Home') {

      navigation.navigate('Home')
    }
    else if (label == 'Play/History') {
      navigation.navigate('Play/History')
    }
    else if (label == 'Schedule') {
      navigation.navigate('Schedule')
    }
    else if (label == 'Engineers') {
      navigation.navigate('Engineers')
    }
    else if (label == 'Gospel') {
      navigation.navigate('Gospel')
    }
    else if (label == 'About') {
      navigation.navigate('About')
    }
    else if (label == 'GuestBook') {
      navigation.navigate('GuestBook')
    }
    else if (label == 'Contact') {
      navigation.navigate('Contact')
    }
  }

  const renderItem = ({ item }) => {
    
    return (
      <TouchableOpacity style={[styles.flatListContainer]} onPress={() => screenHandler(item.text)}>
        <Text style={[styles.Text, { fontSize: 10 }]}>{item.text}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
