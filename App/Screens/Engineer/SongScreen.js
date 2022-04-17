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
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../../Components/Loading';
import { useIsFocused } from "@react-navigation/native";
import AppServices from '../../Server/AppServices';
import Play from 'react-native-vector-icons/AntDesign';


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
        debugger
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
                setRefresh(!refresh)
            }
        } catch (err) {
            setprocess(false)
            console.log(err)
        }
        setprocess(false)
    }

    const onClickRandomButton = (sample_url,title,artist_name) => {
      setsongPlayed(sample_url)
        setrecentTitle(title),
        setrecentArtist(artist_name)
    }
  

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => onClickRandomButton(item.sample_url,item.title, item.artist_name)
          }>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#000', '#000',]}
                    style={{
                        paddingVertical: 5, marginTop: 5, borderRadius: 7, paddingHorizontal: 10, shadowOffset: {
                            width: 0,
                            height: 15,
                        },
                        shadowOpacity: 0.60,
                        shadowRadius: 15.00,
                        elevation: 10, shadowColor: '#000'
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image source={{ uri: params.url }} style={{ width: 50, height: 50, borderRadius: 5 }} />
                            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                                <Text style={[styles.Text, { fontSize: 14, color: '#CB3BF7' }]}>{item.title}</Text>
                                <Text style={[styles.Text, { fontSize: 8 }]}>{item.artist_name}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Play name="playcircleo" size={20} color="#CB3BF7" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#4F4C4D', '#ffffff00',]} style={styles.body}>



            <View style={{ flexDirection: 'row', paddingVertical: 30, paddingHorizontal: 50 }}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <Iconn name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginVertical: 10 }}>

                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Text style={{ color: '#fff' }}>Price : </Text>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }} >${price}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#fff' }}>Buy_Album :</Text>
                    <Text style={{ color: 'yellow', marginLeft: 5, textDecorationLine: 'underline' }} onPress={() => token != false ? Linking.openURL(purchase_url) : navigation.navigate('Login')}> {token != false ? "Click Here" : "Login"}</Text>

                </View>


            </View>
            <View style={{
                width: 195, height: 195, justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                shadowColor: '#ff0065',
                shadowOffset: {
                    width: 0,
                    height: 20,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,
                elevation: 50,
                borderRadius: 10,
                backgroundColor: '#000',
            }}>
                <Image style={{
                    width: 195, height: 195, borderRadius: 5
                }} source={{ uri: urlImage }} />

            </View>
            <View style={{ flexDirection: 'row', marginVertical: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ paddingHorizontal: 30, }}>
                    <Text style={{ color: '#CB3BF7', fontSize: 14, fontWeight: 'bold', alignSelf: 'center' }}>{songPlayed? recentTitle :  title}</Text>
                    <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold', paddingLeft: 9, alignSelf: 'center' }}> { songPlayed ? recentArtist : artist}</Text>
                    <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 12, marginTop: 5 }}>
                        {new Date((progress.duration - progress.position) * 1000).toISOString().substr(14, 5)}
                    </Text>
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
                        height: 15,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,
                    elevation: 24,
                    backgroundColor: '#ff0065',
                    marginHorizontal: 50
                }} onPress={() => togglePlayBack(playbackState)}>
                    <TouchableOpacity onPress={() => togglePlayBack(playbackState)}>

                        {playbackState == State.Playing ?
                            <Iconn name="pause" size={10} color="#fff" /> :
                            <Iconn name="play" size={10} color="#fff" />}
                    </TouchableOpacity>

                </TouchableOpacity>

            </View>

            <View style={{ width: '100%', height: 0.7, borderWidth: 0.2, borderColor: '#ff0065', marginTop: 0 }}></View>

            <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "#0009" }}
                contentContainerStyle={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={{ marginTop: 10, paddingHorizontal: 10 }}>

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

