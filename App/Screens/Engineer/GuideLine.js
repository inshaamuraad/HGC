import React, {useRef} from 'react'
import { View, Text, TouchableOpacity ,Image} from 'react-native'
import TimedSlideshow from 'react-native-timed-slideshow';

import Carousel from 'react-native-snap-carousel';

const GuideLine = () => {

    const carouselRef = useRef('')
    const carouselItems = [
        {
            url: require('../../../Assets/Images/HgcBanner.jpeg'),
        },
        {
            url: require('../../../Assets/Images/ban.png'),
        },


    ]
    const items = [
        {
            uri: "https://hgcradio.org/storage/app/public/ads/images/adv839by200(1).png",

        },
        {
            uri: "https://hgcradio.org/storage/app/public/ads/images/1200by 219.png",

        },

    ]
    function EmptySpace() {
        return (
            <>
                <View style={{ height: 0, width: 0 }}>
                </View>
            </>
        )
    }
    const _renderItem = ({ item, index }) => {
        return (
            <View style={{
                shadowOffset: {
                    width: 0,
                    height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,
                elevation: 20,
            }}>
                <Image style={{ height: 150, width: 250,  resizeMode: 'contain' }} source={item.url} />
                {/* <View style={{
              position: 'absolute', backgroundColor: '#0009', borderRadius: 20,
              height: 150,
              padding: 50,
              marginLeft: 25,
              marginRight: 25,
              justifyContent: 'center',
              alignItems: 'center',
              width: 230,
            }}>
              <Text style={{ color: '#e7e7e7e7', fontWeight: 'bold', fontSize: 11 }}>
                Hallelujah Choice Radio
              </Text>
            </View> */}

            </View >
        )
    }

    return (
        <View>
            <Text style={{ paddingVertical: 40, alignSelf: 'center', fontSize: 16, color: '#031489', fontWeight: 'bold' }}>ALBUMS DISTRIBUTION
            </Text>
            <TouchableOpacity style={{
                backgroundColor: "#e3e3e3", borderRadius: 25, marginTop: 20, elevation: 15, shadowColor: "#0009", marginHorizontal: 10, padding: 20, marginBottom: 5, shadowOffset: {
                    width: 0,
                    height: 15,
                },
                shadowOpacity: 0.60,
                shadowRadius: 15.00,
                elevation: 20,
            }}
            >
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{width : '88%',fontSize: 12, color: '#031489', fontWeight: 'bold' }}>High visibility :
                    <Text style={{ fontSize: 12, color: '#000', alignSelf: 'center' }}>means more exposure and higher viewership of your music in the retail marketplace.</Text>
                     </Text>
                    <View>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontSize: 12, color: '#031489', fontWeight: 'bold' }}>Display of your music catalog : 
                    <Text style={{ fontSize: 12, color: '#000', }}>means providing our site users and listeners a vast selection of Gospel music through access of your catalog on their preferred device,and listeners a vast selection of Gospel music through access of your catalog on their preferred device. </Text>
                    </Text>
                    <View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontSize: 12, color: '#031489', fontWeight: 'bold' }}>Monetary blessings : 
                    <Text style={{ fontSize: 12, color: '#000', }}>the listening audience who purchase your music are also enabled to give financially toward your ministries.</Text>
                    </Text>
                    <View>
                    </View>
                </View>
                <Text style={{ fontSize: 10, color: '#000', }}> </Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontSize: 12, color: '#031489', fontWeight: 'bold' }}>Create a connection : 
                    <Text style={{ fontSize: 12, color: '#000', }}> means our distribution platform is designed to show your music at its best and encourage sales. We believe that when Gospel music supporters make a connection with their favorite artists,they want to support them all the way.</Text>
                    </Text>
                    <View>
                    </View>
                </View>
                
            </TouchableOpacity>

            <View style={{ paddingHorizontal: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 30 }}>
                    <Carousel
                        layout={"default"}
                        ref={carouselRef}
                        data={carouselItems}
                        sliderWidth={400}
                        itemWidth={280}
                        renderItem={_renderItem}
                        contentContainerStyle={{ marginTop: 70 }}
                        autoplay={true}
                        loop={true} />
                </View>
            </View>
        </View>
    )
}

export default GuideLine