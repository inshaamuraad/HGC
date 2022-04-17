import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Play from 'react-native-vector-icons/AntDesign';
import BG from '../../../Assets/Images/girl.jpeg'
import DownArrow from 'react-native-vector-icons/Feather';
import TrackPlayer, { State } from 'react-native-track-player';
import LottieView from 'lottie-react-native';
import { useIsFocused } from "@react-navigation/native";
import TimedSlideshow from 'react-native-timed-slideshow';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../../Assets/css/style';
import AppServices from '../../Server/AppServices';
const trackPlayerInit = async () => {
    await TrackPlayer.stop()
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
            title: "Advertise Here !!",
            text: "EMAIL US, radio@hallelujahgospel.com",
        },

    ]

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


    const nowPlayingSong = async () => {
        setprocess(true)
        const Storage = new AppServices();
        var res = await Storage.getCurrentSong();
        try {
            if (res.data) {
                let albumData = res.data.data.now_playing
                settitleName(albumData.text)
                setalbumName(albumData.artist)
            }
        } catch (err) {
            setprocess(false)
            console.log(err)
        }
        setprocess(false)
    }


    return (

        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#4F4C4D', '#ffffff00',]} style={styles.body}>
            <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "#000000AA" }}
                contentContainerStyle={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 60 }}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Icon name="arrow-left" size={20} color="#fff" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                        marginVertical: 60
                    }}>
                        <LottieView source={require('../../../Assets/Lottie/circleWave.json')} style={{ width: 330, height: 330 }} autoPlay loop />
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
                                width: 180,
                                height: 180,
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
                                marginBottom: 80
                            }} onPress={() => onButtonPressed()}>
                                <Image source={BG} style={{
                                    width: 180,
                                    height: 180,
                                    borderRadius: 1000,
                                }} />
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 20, alignItems: 'center' }}>
                            <View style={{ paddingHorizontal: 50 }}>
                                <Text style={{ color: '#CB3BF7', fontSize: 12, fontWeight: 'bold' }}>{titleName}</Text>
                                <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold', paddingLeft: 9 }}>{albumName}</Text>
                            </View>
                            <TouchableOpacity style={{
                                width: 50,
                                height: 50,
                                borderRadius: 99,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 999,
                                shadowColor: '#CB3BF7',
                                shadowOffset: {
                                    width: 0,
                                    height: 12,
                                },
                                shadowOpacity: 0.58,
                                shadowRadius: 16.00,
                                elevation: 24,
                                backgroundColor: '#ff0065',
                                marginHorizontal: 50
                            }} onPress={() => onButtonPressed()}>
                                <TouchableOpacity onPress={() => onButtonPressed()}>
                                    {isPlaying ?
                                        <Icon name="pause" size={10} color="#fff" /> :
                                        <Icon name="play" size={10} color="#fff" />}
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', height: 100, paddingBottom: 50, marginTop: 200 }}>
                    <TimedSlideshow
                        items={items}
                        onClose={() => setclose(false)}
                        showProgressBar={true}
                    />
                </View>
            </ScrollView>
        </LinearGradient>

    );
}

