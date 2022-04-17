import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Vedio } from 'react-native';
import styles from '../../Assets/css/style';
import Video from 'react-native-video';

const DashBoardList = () => {
  const [paused, setpaused] = useState(false)
  const Vedios = [
    {
      id: 0,
      uri: require('../../Assets/Images/pipeline.mp4')
    },
    {
      id: 1,
      uri: require('../../Assets/Images/scroll_pages.mp4')
    },
    {
      id: 2,
      uri: require('../../Assets/Images/pipeline.mp4')
    },
    {
      id: 3,
      uri: require('../../Assets/Images/singalong.mp4')
    },
    {
      id: 4,
      uri: require('../../Assets/Images/scroll_pages.mp4')
    },
  ]
  const renderItem = ({ item }) => {
  
    return (
      <TouchableOpacity style={styles.flatListVedios} >
        <Video style={styles.VedioContainerSlider} source={item.uri}
          play={true}
        />
      </TouchableOpacity>
    )
  }
  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        horizontal
        data={Vedios}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
export default DashBoardList;