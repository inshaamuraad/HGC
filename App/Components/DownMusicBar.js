import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../Assets/css/style';
import PlayButton from '../../Assets/Icons/playButton.png'
import MusicAlbum from '../../Assets/Icons/musicAlbum.png'
import { useNavigation } from '@react-navigation/native';


export default function DownMusicBar({ }) {

    const navigation = useNavigation();




    return (
        <View style={styles.downBar}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 13, paddingVertical: 8, paddingHorizontal: 8 }} 
                onPress={() => navigation.navigate('RadioLive')}>
                    <View>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>Playing Music</Text>
                        <Text style={{ fontSize: 9, color: '#AD15FD', marginTop: 2 }}>Listen your favourite music</Text>
                        <Text style={{ fontSize: 8, marginTop: 2, color: '#fff' }}>Album : Collecto'r Edition </Text>
                        <Text style={{ fontSize: 8, marginTop: 2, color: '#fff' }}>Artist : 10-save-the-youth-today</Text>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => navigation.navigate('RadioLive')}>
                        <TouchableOpacity onPress={() => navigation.navigate('RadioLive')}>
                            <Image source={PlayButton} style={[styles.playBtn, { borderColor: '#1E0F2FS', borderWidth: 1, marginBottom:20, marginLeft:30 }]} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={{ height: "100%", width: 2, backgroundColor: 'grey', marginRight: 50 }}>
                </View>
                <TouchableOpacity style={{ marginRight: 50,paddingVertical:7 , marginBottom:20}} onPress={() => navigation.navigate('AlbumCatlog')}>
                    <Image source={MusicAlbum} style={{ width: 30, height: 30, alignSelf: 'center' }} />
                    <Text style={{ fontSize: 8, marginTop: 2, color: '#000' }}>Album's Catelog</Text>
                </TouchableOpacity>



            </View>



        </View>
    );
}
