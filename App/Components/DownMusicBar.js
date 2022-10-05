import React, { useState ,useEffect} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../Assets/css/style';
import PlayButton from '../../Assets/Icons/playButton.png'
import MusicAlbum from '../../Assets/Icons/album.jpeg'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function DownMusicBar({ }) {

    const navigation = useNavigation();
    const route = useRoute();
    const [url, seturl] = useState('')

    useEffect(() => {
        routeCheck();
    }, [])
    const routeCheck = () => {

        if (route.name == 'Play/History') {
            seturl('https://hgcradio.org/storage/app/public/ads/images/adv839by200(1).png')
        }if(route.name == 'Gospel Websites'){
            seturl('https://hgcradio.org/storage/app/public/ads/images/ad_1_1200by219.png')
        }if(route.name == 'Engineers'){
            seturl('https://hgcradio.org/storage/app/public/ads/images/1200by 219.png')
        }if(route.name == 'Schedule'){
            seturl('https://hgcradio.org/storage/app/public/ads/images/adv839by200(1).png')
        }
        if(route.name == 'Contact'){
            seturl('https://hgcradio.org/storage/app/public/ads/images/adv839by200(1).png')
        }
        if(route.name == 'GuestBook'){
            seturl('https://hgcradio.org/storage/app/public/ads/images/ad_1_1200by219.png')
        }
    }
    

    if(route.name == 'Play/History' ||  route.name == 'Gospel Websites' || route.name == 'Schedule' ||route.name == 'Contact' || route.name == 'GuestBook'){
    return (
        <View style={[styles.downBar,{marginBottom: 10, borderWidth: 1,
            height: 100, }]}>
            <Image source={{ uri: url }} style={{ width: '100%', height:(route.name == 'Play/History' || route.name == 'Schedule' || route.name == 'Contact')? 90 :70, resizeMode: (route.name == 'Play/History' || route.name == 'Schedule' || route.name == 'Contact') ? 'cover' :'contain'  }} />
        </View>
    );
    }if(route.name == 'Engineers'){
        return (
            <View style={[styles.downBar,{ borderWidth: 1,marginTop: '60%',}]}>
                <Image source={{ uri: url }} style={{ width: '100%', height: 70, resizeMode: 'cover'  }} />

            </View>
        );
        }
    }


