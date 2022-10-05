import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../../Assets/css/style';
import LottieView from 'lottie-react-native';
import AppServices from '../../Server/AppServices';
import PlayButton from '../../../Assets/Icons/playButton.png'
import SoundPlayer from 'react-native-sound-player'
import Play from 'react-native-vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../../Components/Loading';
import DownArrow from 'react-native-vector-icons/Feather';
import {useRoute} from '@react-navigation/native';


const BuyAlbum = ({ route }) => {
    const { params } = route
    const navigation = useNavigation()
    const isFocused = useIsFocused();
    const [Music, setMusic] = useState([])
    const [process, setprocess] = useState(false)
    const [puchaseUrl, setpuchaseUrl] = useState(params.purchase_url)
    const [handle, sethandle] = useState(false)
    const [refresh, setRefresh] = useState(true)
    const routee = useRoute();
    useEffect(() => {
        if (isFocused) {
            getAlbumsData();
        }
    }, [isFocused])

    const getAlbumsData = async () => {
        setprocess(true)
        const Storage = new AppServices();
        var res = await Storage.getAlbumSongs(params.id);
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

    const playTrack = (item, check) => {
        if (handle == false && check == "play") {
            SoundPlayer.playUrl(item)
            sethandle("play")
        }
        else if (handle == "play" && check == "pause") {
            SoundPlayer.pause(item)
            sethandle("pause")
        }
        else if (handle == "pause" && check == "play") {
            SoundPlayer.resume(item)
            sethandle("play")
        } else {
            SoundPlayer.playUrl(item)
            sethandle("play")
        }
    }
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Song', {
                sample_url: item.sample_url,
                title: item.title,
                slug: item.slug,
                artist_name: item.artist_name,
                duration: item.duration,
                price: item.price,
                id: item.id,
                url: params.url,
                purchase_url: puchaseUrl,
                index: index,
                albumSongs:params.id
            })}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#fff', '#fff',]}
                    style={{
                        paddingVertical: 5, marginTop: 5, borderRadius: 7, paddingHorizontal: 10, shadowOffset: {
                            width: 0,
                            height: 15,
                        },
                        shadowOpacity: 0.60,
                        shadowRadius: 15.00,
                        elevation: 4, shadowColor: '#000',
                        marginHorizontal: 2
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image source={{ uri: params.url }} style={{ width: 70, height: 70, borderRadius: 5 }} />
                            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                                <Text style={[styles.Text, { fontSize: 14, color: '#031489', fontWeight:'bold' }]}>{item.title}</Text>
                                <Text style={[styles.Text, { fontSize: 11,  color: '#000' }]}>{item.artist_name}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Play name="playcircleo" size={20} color="#031489" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.body}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 20 }}>
                        <TouchableOpacity style={{ width: 50 }} onPress={() => navigation.pop()}>
                    <DownArrow name="arrow-left" size={20} color="#031489" />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , marginRight: 30}}>
                    <Text style={{ alignSelf: 'center', color: '#031489', fontWeight: 'bold' }}>{routee.name}</Text>
                </View>
            </View>
            <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "#fff" }}
                contentContainerStyle={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={{ marginTop: 10, paddingHorizontal: 10 , }}>
                  
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
        </SafeAreaView>
    );
};
export default BuyAlbum;

