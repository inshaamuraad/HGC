import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Vedio } from 'react-native';
import styles from '../../Assets/css/style';
import Video from 'react-native-video';

const AdvertiseList = () => {
  const [paused, setpaused] = useState(false)
  const Vedios = [
    {
      id: 0,
      uri: 'https://hgcradio.org/storage/app/public/ads/singalong.mp4'
    },
    {
      id: 1,
      uri: 'https://hgcradio.org/storage/app/public/ads/pipeline.mp4'
    },
    {
      id: 2,
      uri: 'https://hgcradio.org/storage/app/public/ads/scroll_pages.mp4'
    },
    {
        id: 3,
        uri: 'https://hgcradio.org/storage/app/public/ads/hg.mp4'
      },
    
  ]
  const renderItem = ({ item }) => {
  
    return (
      <TouchableOpacity style={styles.flatListVedios} >
        <Video style={styles.VedioContainerSlider} source={{uri : item.uri}}
          play={true}
          playWhenInactive={true}
        resizeMode = "contain"

        />
      </TouchableOpacity>
    )
  }
  return (
    <View style={{ marginTop: 10, marginHorizontal: 10, marginBottom:10 }}>
      <FlatList
        horizontal
        data={Vedios}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
export default AdvertiseList;