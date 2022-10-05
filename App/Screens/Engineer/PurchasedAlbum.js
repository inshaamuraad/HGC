import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native'
import { ProgressBar, Colors } from 'react-native-paper';
import AppServices from '../../Server/AppServices'
import styles from '../../../Assets/css/style'
import Loading from '../../Components/Loading'
import DownLoad from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/core';
import DownArrow from 'react-native-vector-icons/Feather';

const PurchasedAlbum = ({route}) => {
    debugger
    const navigation = useNavigation();
     const {token} = route.params
    const [purchased, setPurchased] = useState([])
    const [process, setprocess] = useState(false)
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        PurchasedAlbums();
    }, [])
    const PurchasedAlbums = async () => {
        const Server = new AppServices();
        // let token = "89|eZaX2zvcTHNw1ArkIHiNwQwGSQTaBxU8s2Ouu4lf"
        debugger
        const res = await Server.previousPayment(token)
        try {
            if (res.data) {
                let albumData = res.data.data
                setPurchased(albumData)
                setRefresh(!refresh)
            }
        } catch (err) {
            setprocess(false)
            console.log(err)
        }
        setprocess(false)
    }
    const renderItem = ({ item, index }) => {
        debugger
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30, }}>
                <View style={{
                    width: 350, paddingVertical: 20, backgroundColor: '#ffff', borderRadius: 20, marginVertical: 10, borderWidth: 0.8, borderColor: "#fff",
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,
                    elevation:20
                }} >
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: item.item.image_url }} style={{ height: 90, width: 90, borderRadius: 10, marginHorizontal: 10 }} />
                            <View>
                                <Text style={[styles.Text, { fontSize: 14, marginVertical: 3 }]}>Title {item.item.title}</Text>
                                <Text style={[styles.Text, { width: '90%',fontSize: 10, marginVertical: 3 }]}>Slug : {item.item.slug}</Text>
                                <Text style={[styles.Text, { fontSize: 10, marginVertical: 3 }]}>Payed Amount : ${item.item.price}</Text>

                                <View style={{ marginVertical: 3, width: 20 }}>
                                    <ProgressBar progress={0.3} color="#031489" />
                                </View>

                            </View>
                        </View>

                        <TouchableOpacity style={{paddingHorizontal : 20}} onPress={() => navigation.navigate('Download', {
                             tokenn : token,
                             id: item.item.id
                        })}>
                            <DownLoad name="download" size={20} color="#031489" />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }
    return (
        <View style={styles.body}>
             <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10, marginTop:30 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Handler')} style={{ width: 80 }}>
                    <DownArrow name="arrow-left" size={20} color="#031489" />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "#fff" }}
                contentContainerStyle={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={{ marginTop: 10, paddingHorizontal: 10 }}>

                    <FlatList
                        data={purchased}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        extraData={refresh}
                    />
                </View>
            </ScrollView>
            {process == true &&
                <Loading />
            }
        </View>
    )
}

export default PurchasedAlbum