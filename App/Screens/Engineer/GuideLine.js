import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import TimedSlideshow from 'react-native-timed-slideshow';


const GuideLine = () => {
    const items = [
        {
            uri:"https://hgcradio.org/storage/app/public/ads/images/adv839by200(1).png",

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
    
    return (
        <View>
            <Text style={{ paddingVertical: 40, alignSelf: 'center', fontSize: 16, color: '#CB3BF7', fontWeight: 'bold' }}>ALBUMS DISTRIBUTION
            </Text>
            <TouchableOpacity style={{ backgroundColor: "#292929", borderRadius: 25, marginTop: 20, elevation: 15, shadowColor: "#0009", marginHorizontal: 10, padding: 20, marginBottom: 5 , shadowOffset: {
                                    width: 0,
                                    height: 15,
                                },
                                shadowOpacity: 0.60,
                                shadowRadius: 15.00,
                                elevation: 20, shadowColor: '#CB3BF7'}}
            >
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontSize: 12, color: '#CB3BF7', fontWeight: 'bold' }}>High visibility : </Text>
                    <View>
                    <Text style={{ fontSize: 10, color: '#fff', alignSelf:'center' }}>means more exposure and higher viewership of your </Text>
                    </View>
                </View>
                <Text style={{ fontSize: 10, color: '#fff',  }}>music in the retail marketplace.</Text>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontSize: 12, color: '#CB3BF7', fontWeight: 'bold' }}>Display of your music catalog : </Text>
                    <View>
                    <Text style={{ fontSize: 10, color: '#fff',   }}>means providing our site users and </Text>
                    </View>
                </View>
                <Text style={{ fontSize: 10, color: '#fff', }}>listeners a vast selection of Gospel music through access of your catalog on their preferred device.</Text>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontSize: 12, color: '#CB3BF7', fontWeight: 'bold' }}>Monetary blessings : </Text>
                    <View>
                    <Text style={{ fontSize: 10, color: '#fff',   }}>the listening audience who purchase your</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 10, color: '#fff', }}> music are also enabled to give financially toward your ministries.</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontSize: 12, color: '#CB3BF7', fontWeight: 'bold' }}>Create a connection : </Text>
                    <View>
                    <Text style={{ fontSize: 10, color: '#fff',   }}> means our distribution platform is designed to </Text>
                    </View>
                </View>
                <Text style={{ fontSize: 10, color: '#fff', }}> show your music at its best and encourage sales. We believe that when</Text>
                <Text style={{ fontSize: 10, color: '#fff', }}> Gospel music supporters make a connection with their favorite artists,</Text>
                <Text style={{ fontSize: 10, color: '#fff', }}> they want to support them all the way. </Text>
             
   
      </TouchableOpacity>

<View style={{paddingHorizontal :10}}>
      <View style={{ width: '100%', height: 150, paddingBottom: 50, marginTop: 200 }}>
                    <TimedSlideshow
                        items={items}
                        onClose={() => setclose(false)}
                        showProgressBar={true}
                        renderCloseIcon={EmptySpace}
                    />
                </View>
                </View>
        </View>
    )
}

export default GuideLine