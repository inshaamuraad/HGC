
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Play from 'react-native-vector-icons/AntDesign';
import BG from '../../../Assets/Images/musiccc.jpeg'
import DownArrow from 'react-native-vector-icons/Feather';
import TrackPlayer, { State } from 'react-native-track-player';
import LottieView from 'lottie-react-native';
import { useIsFocused } from "@react-navigation/native";
import TimedSlideshow from 'react-native-timed-slideshow';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../../Assets/css/style';
import AppServices from '../../Server/AppServices';
import Playy from '../../../Assets/Images/playy.webp'
import PARTNER from '../../../Assets/Images/pp.webp'
import Pausee from '../../../Assets/Images/pause.png'
import Carousel from 'react-native-snap-carousel';
const trackPlayerInit = async () => {

    await TrackPlayer.add([{
        // id: '1',
        // url:'https://my.hgcradio.org:8000/radio.mp3',
        url: 'https://my.hgcradio.org:8000/radio.mp3', // Load media from the network
        title: 'Avaritia',
        artist: 'deadmau5',
        album: 'while(1<2)',
        genre: 'Progressive House, Electro House',
        date: '2014-05-20T07:00:00+00:00', // RFC 3339
        artwork: 'http://example.com/cover.png', // Load artwork from the network
        duration: 402 // Duration in seconds
    }]);

};


export default function RadioLive({ navigation }) {

    const isFocused = useIsFocused();
    const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [refresh, setrefresh] = useState(true)
    const [close, setclose] = useState(false)
    const [titleName, settitleName] = useState('')
    const [process, setprocess] = useState(false)
    const [albumName, setalbumName] = useState('')
    const [url, seturl] = useState('')
    const carouselRef = useRef('')
    const carouselItems = [
        {
            url: require('../../../Assets/Images/HgcBanner.jpeg'),
        },
        {
            url: require('../../../Assets/Images/hgctt.png'),
        },


    ]
    //initialize the TrackPlayer when the App component is mounted
    useEffect(() => {
        if (isFocused) {
            const startPlayer = async () => {
                let isInit = await trackPlayerInit();
                setIsTrackPlayerInit(isInit);
            }
            startPlayer();
        }
    }, [isFocused]);
    const items = [
        {
            uri: "https://hgcradio.org/public/front/images/radio-banner.jpg",
        },
        {
            uri: require('../../../Assets/Images/black.jpeg'),
        },

    ]



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
                <Image style={{ height: 150, width: 250, resizeMode: 'contain' }} source={item.url} />
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

    //start playing the TrackPlayer when the button is pressed 
    const onButtonPressed = async () => {

        const state = await TrackPlayer.getState();

        if (!isPlaying) {
            TrackPlayer.play();
            setIsPlaying(true);
        } else {
            TrackPlayer.pause();
            setIsPlaying(false);
        }
    }

    useEffect(() => {
        nowPlayingSong()
    }, [])
    function EmptySpace() {
        return (
            <>
                <View style={{ height: 0, width: 0 }}>
                </View>
            </>
        )
    }

    const nowPlayingSong = async () => {
        setprocess(true)
        const Storage = new AppServices();
        var res = await Storage.getCurrentSong();
        try {
            if (res.data) {

                let albumData = res.data.data.now_playing
                let albumDataa = res.data.data.show
                settitleName(albumData.text)
                setalbumName(albumData.artist)
                seturl(albumDataa.host_image)
            }
        } catch (err) {
            setprocess(false)
            console.log(err)
        }
        setprocess(false)
    }


    return (

        <ImageBackground source={BG} style={styles.body}>
            <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "#0009" }}
                contentContainerStyle={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 60 }}>
                    {/* <TouchableOpacity onPress={() => navigation.pop()} style={{ width: 50 }}>
                        <Icon name="arrow-left" size={20} color="#fff" />
                    </TouchableOpacity> */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                        <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: 'bold' }}>NOW ON AIR</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {/* <View style={{ elevation: 4, }}>
                        <Text style={{ color: '#e7e7e7e7', fontWeight: 'bold' }}>
                            Hallelujah Choice Radio
                        </Text>
                    </View>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 10, marginTop: 10 }}>
                        By HGCRadio AutoDJ
                    </Text> */}
                    <View style={{
                        width: 260,
                        height: 260,
                        justifyContent: "center",
                        alignItems: 'center',
                        marginVertical: 30
                    }}>
                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "absolute"
                            }}
                        >
                            <TouchableOpacity style={{
                                width: 220,
                                height: 220,
                                borderRadius: 1000,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 999,
                                shadowColor: '#ff0065',
                                shadowOffset: {
                                    width: 0,
                                    height: 12,
                                },
                                shadowOpacity: 0.58,
                                shadowRadius: 16.00,
                                elevation: 24,
                                backgroundColor: '#1E0F2F',
                                marginBottom: 150
                            }}>
                                <Image source={{ uri: url }} style={{
                                    width: 200,
                                    height: 200,
                                    borderRadius: 1000,
                                }} />


                                <View style={{
                                    width: 180,
                                    height: 180,
                                    borderRadius: 1000,
                                    position: 'absolute',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>

                                    <View style={{
                                        width: 170,
                                        height: 170,
                                        borderRadius: 1000,
                                        position: 'absolute',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: 5, borderColor: '#fff'
                                    }}>


                                        <TouchableOpacity onPress={() => onButtonPressed()}>
                                            {isPlaying ?
                                                <Image source={Pausee} style={{
                                                    width: 150,
                                                    height: 150,
                                                    borderRadius: 1000,
                                                }} />
                                                :
                                                <Image source={Playy} style={{
                                                    width: 150,
                                                    height: 150,
                                                    borderRadius : 1000,
                                                }} />
                                            }
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 200 }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 30 }}>Playing Now</Text>

                            <Text style={{ color: '#e3e3e3', fontSize: 12, fontWeight: 'bold', marginTop: 13 }}>{titleName}</Text>
                            <Text style={{ color: '#10a8ab', fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>{albumName}</Text>
                            {isPlaying ?
                                <LottieView source={require('../../../Assets/Lottie/wave.json')} style={{ width: 40, height: 40, marginTop: 5 }} autoPlay loop />

                                :
                                <LottieView source={require('../../../Assets/Lottie/wave.json')} style={{ width: 40, height: 40, marginTop: 5 }} autoPlay loop />

                            }
                        </View>
                    </View>

                </View>
                <TouchableOpacity style={{alignSelf : 'center', marginTop: 20}}
                onPress={() => Linking.openURL('https://hgcradio.org/payments/initiate')}>
                    {/* <Image style={{ height: 80, width: 130, borderRadius: 20, resizeMode: 'contain' ,}} source={PARTNER} /> */}

                </TouchableOpacity>


                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 30 }}>
                    <Carousel
                        layout={"default"}
                        ref={carouselRef}
                        data={carouselItems}
                        sliderWidth={500}
                        itemWidth={350}
                        renderItem={_renderItem}
                        contentContainerStyle={{ marginTop: 70 }}
                        autoplay={true}
                        loop={true} />
                </View>

            </ScrollView>
        </ImageBackground>

    );
}


