import React, { useRef, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Text, View, StyleSheet ,Image, TouchableOpacity} from 'react-native';
import styles from '../../../Assets/css/style';

export default function Carousell() {

    const carouselRef = useRef('')

    const carouselItems = [
        {
            url: require('../../../Assets/Images/engineer1.jpeg')
        },
        {
            url: require('../../../Assets/Images/engineer2.jpeg')
        },
        {
            url: require('../../../Assets/Images/engineer3.jpeg')
        },
        {
            url: require('../../../Assets/Images/engineer4.jpeg')
        },
        {
            url: require('../../../Assets/Images/gril.jpeg')
        },
    ]
   const _renderItem = ({item,index}) => {
        return (
          <View style={styles.sliderContainer}>
           <Image style={styles.ImageContainerSlider} source={item.url}/>
          </View>
        )
    }

    return (

<View stye={{flex: 1}}> 
        <View style={{flexDirection:'row', justifyContent: 'center', marginTop: 20}}>
            <Carousel
              layout={"default"}
              ref={carouselRef}
              data={carouselItems}
              sliderWidth={440}
              itemWidth={180}
              renderItem={_renderItem}/>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop: 20 , paddingHorizontal: 15}}>
        <Text style={[styles.Text, { fontWeight: 'bold' }]}>Glospel Platform</Text>
        <TouchableOpacity>
          <Text style={{ color: '#AD15FD' }}>See All <Text style={styles.Text}>></Text> </Text>
        </TouchableOpacity>
      </View>
</View>
 
    );
}
