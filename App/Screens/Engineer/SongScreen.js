import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, Button, Linking, Animated, Dimensions } from 'react-native';
import styles from '../../../Assets/css/style';
import LottieView from 'lottie-react-native';
import TrackPlayer, { useProgress, Capability, Event, RepeatMode, usePlaybackState, useTrackPlayerEvents, State } from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/AntDesign';
import ApiServices from '../../Server/ApiServices';
import Iconn from 'react-native-vector-icons/FontAwesome';
import Icoon from 'react-native-vector-icons/AntDesign';

import LinearGradient from 'react-native-linear-gradient';
import Loading from '../../Components/Loading';
import { useIsFocused } from "@react-navigation/native";
import AppServices from '../../Server/AppServices';
import Play from 'react-native-vector-icons/AntDesign';
import Loginn from 'react-native-vector-icons/Entypo';
import BuyNow from 'react-native-vector-icons/FontAwesome5';



const { width } = Dimensions.get('window')



const SongScreen = ({ route }) => {

    const navigation = useNavigation();
    const { params } = route
    const isFocused = useIsFocused();

    const playbackState = usePlaybackState();
    const ScrollX = useRef(new Animated.Value(0)).current;
    const songSlider = useRef(null)
    const [songIndex, setsongIndex] = useState(0)
    const [urlTest, seturlTest] = useState(params.sample_url)
    const [title, settitle] = useState(params.title)
    const [artist, setartist] = useState(params.artist_name)
    const [durationn, setdurationn] = useState(params.duration)
    const [price, setprice] = useState(params.price)
    const [urlImage, seturlImage] = useState(params.url)
    const [handle, sethandle] = useState(false)
    const [album, setalbum] = useState()
    const [indexx, setindexx] = useState(params.index)
    const [purchase_url, setPurchase_url] = useState(params.purchase_url)
    const [token, setToken] = useState('')
    const [id, setid] = useState(params.id)
    const [albumSongs, setalbumSongs] = useState(params.albumSongs)
    const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [puchaseUrl, setpuchaseUrl] = useState(params.purchase_url)
    const [process, setprocess] = useState(false)
    const [Music, setMusic] = useState([])
    const [recentTitle, setrecentTitle] = useState('')
    const [recentArtist, setrecentArtist] = useState('')
    const [refresh, setRefresh] = useState(true)
    const [songPlayed, setsongPlayed] = useState('')
    const [albumTypeId, setalbumTypeId] = useState('')

    const progress = useProgress()

    const setupPlayer = async () => {
        //  await TrackPlayer.setupPlayer();
        await TrackPlayer.stop()
        TrackPlayer.reset();
        if (songPlayed) {

            let tracks = [{
                id: id,
                url: songPlayed, // Load media from the file system
                title: title,
                artist: artist,
                // Load artwork from the file system:
                artwork: urlImage,
                duration: durationn
            }]
            await TrackPlayer.add(tracks)
            await TrackPlayer.play()
            TrackPlayer.updateOptions({
                stopWithApp: false,
                // Media controls capabilities
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.Stop,
                ],
                // Capabilities that will show up when the notification is in the compact form on Android
                compactCapabilities: [Capability.Play, Capability.Pause],
                // Icons for the notification on Android (if you don't like the default ones)
            });
        } else {
            let tracks = [{
                id: id,
                url: urlTest, // Load media from the file system
                title: title,
                artist: artist,
                // Load artwork from the file system:
                artwork: urlImage,
                duration: durationn
            }]
            await TrackPlayer.add(tracks)
            await TrackPlayer.play()
            TrackPlayer.updateOptions({
                stopWithApp: false,
                // Media controls capabilities
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.Stop,
                ],
                // Capabilities that will show up when the notification is in the compact form on Android
                compactCapabilities: [Capability.Play, Capability.Pause],
                // Icons for the notification on Android (if you don't like the default ones)
            });


        }


    }
    const togglePlayBack = async (playbackState) => {
        console.log("pause")
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack != null) {
            if (playbackState == State.Paused) {
                await TrackPlayer.play()
                console.log("play")
            } else {
                await TrackPlayer.pause();
                console.log("pause")
            }
        }
    }
    useEffect(() => {

        setupPlayer();
        getTokenData()

    }, [])
    const getTokenData = async () => {
        let u_toke = ""
        const Storage = new ApiServices()
        u_toke = await Storage.getToken()
        setToken(u_toke)
    }


    useEffect(() => {
        if (songPlayed) {
            setupPlayer();
        }
    }, [songPlayed])
    useEffect(() => {
        if (isFocused) {
            getAlbumsData();
        }
    }, [isFocused])

    const getAlbumsData = async () => {
        setprocess(true)
        const Storage = new AppServices();
        var res = await Storage.getAlbumSongs(params.albumSongs);
        try {
            if (res.data) {
                let albumData = res.data.data.music_in_album
                setMusic(albumData)
                setalbumTypeId(albumData[0].album_id)
                setRefresh(!refresh)
            }
        } catch (err) {
            setprocess(false)
            console.log(err)
        }
        setprocess(false)
    }

    const onClickRandomButton = (sample_url, title, artist_name) => {
        setsongPlayed(sample_url)
        setrecentTitle(title),
            setrecentArtist(artist_name)
    }


    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => onClickRandomButton(item.sample_url, item.title, item.artist_name)
            } style={{marginHorizontal:2, }}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#fff', '#fff',]}
                    style={{
                        paddingVertical: 5, marginTop: 5, borderRadius: 7, paddingHorizontal: 10, shadowOffset: {
                            width: 0,
                            height: 15,
                        },
                        shadowOpacity: 0.60,
                        shadowRadius: 15.00,
                        elevation: 10,
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image source={{ uri: params.url }} style={{ width: 50, height: 50, borderRadius: 5 }} />
                            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                                <Text style={[styles.Text, { fontSize: 14, color: '#031489', fontWeight:'bold' }]}>{item.title}</Text>
                                <Text style={[styles.Text, { fontSize: 11, color: '#000'}]}>{item.artist_name}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Play name="playcircleo" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#4F4C4D', '#ffffff00',]} style={styles.body}>
            <View style={{ flexDirection: 'row', paddingVertical: 30, paddingHorizontal: 50, marginTop: 30 }}>
                <TouchableOpacity onPress={() => navigation.pop()} style={{ width: 50 }}>
                    <Iconn name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Text style={{ color: '#fff' }}>Price : </Text>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }} >${price}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Text style={{ color: '#fff', alignSelf: 'center' }}>{token != false ?  '' : 'Want to buy?'}</Text>
                    <TouchableOpacity style={{ paddingHorizontal:10, paddingVertical: 5, backgroundColor: token != false ? "#031489": 'transparent', flexDirection: 'row', marginHorizontal: 5,  borderRadius: 999, justifyContent: 'center', alignItems: 'center' ,
                      shadowColor: token != false ? '#fff' : 'transparent',
                      shadowOffset: {
                          width: 0,
                          height: 6,
                      },
                      shadowOpacity: 0.58,
                      shadowRadius: 16.00,
                      elevation: 18,
                      }}>
                        {token != false ?
                           <View></View>
                            :
                            <Loginn name="login" size={10} color="yellow" />

                        }
                        <Text style={{ color: token != false ? "#fff":'yellow',alignSelf:'center' , textDecorationLine: token != false ? 'none':'underline' }} onPress={() => token != false ? navigation.navigate('Payment', {
                            payment: albumTypeId,
                            token: token,
                            price: price

                        }) : navigation.navigate('Login')}> {token != false ? "Buy Now" : "Login"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                width: 195, height: 195, justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                shadowColor: '#031489',
                shadowOffset: {
                    width: 0,
                    height: 20,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,
                elevation: 50,
                borderRadius: 10,
                backgroundColor: '#fff',
            }}>
                <Image style={{
                    width: 195, height: 195, borderRadius: 5
                }} source={{ uri: urlImage }} />

            </View>
            <View style={{ flexDirection: 'row', marginVertical: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ paddingHorizontal: 20,width:'60%', alignSelf:'center' }}>
                    <Text style={{ color: '#031489', fontSize: 14, fontWeight: 'bold',  }}>{songPlayed ? recentTitle : title}</Text>
                    <Text style={{ color: '#000', fontSize: 9, fontWeight: 'bold',  }}> {songPlayed ? recentArtist : artist}</Text>
                    <Text style={{ color: '#000', fontSize: 12, marginTop: 5 }}>
                        {new Date((progress.duration - progress.position) * 1000).toISOString().substr(14, 5)}
                    </Text>
                </View>
                <TouchableOpacity style={{
                    width: 60,
                    height: 60,
                    borderRadius: 99,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 999,
                    shadowColor: '#031489',
                    shadowOffset: {
                        width: 0,
                        height: 15,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,
                    elevation: 24,
                    backgroundColor: '#031489',
                    marginHorizontal: 50
                }} onPress={() => togglePlayBack(playbackState)}>
                    <TouchableOpacity onPress={() => togglePlayBack(playbackState)}>

                        {playbackState == State.Playing ?
                            <Icoon name="pausecircleo" size={50} color="#fff" /> :
                            <Icoon name="playcircleo" size={50} color="#fff" />}
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: 0.7, borderWidth: 0.2, borderColor: '#031489', marginTop: 0 }}></View>
            <Text style={{color: '#031489', marginVertical: 5, fontWeight:'bold', fontSize: 14, marginHorizontal: 10, marginTop: 5}}> other songs</Text>
            <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "transparent" , }}
                contentContainerStyle={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={{ marginTop: 10, paddingHorizontal: 10 , marginBottom: 15, paddingBottom: 15}}>

                    <FlatList
                        data={Music}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        extraData={refresh}
                    />
                </View>
            </ScrollView>
            {process == true &&
                <Loading />
            }


        </LinearGradient>
    );
};

export default SongScreen;

