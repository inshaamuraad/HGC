import React, { useState, useEffect } from 'react'
import { View, Text, Button, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Linking, PermissionsAndroid ,Image} from 'react-native'
import { useStripe } from '@stripe/stripe-react-native'
import AppServices from '../../Server/AppServices'
import ApiServices from '../../Server/ApiServices'
import LottieView from 'lottie-react-native';
import styles from '../../../Assets/css/style'
import { useNavigation } from '@react-navigation/core'
import DownArrow from 'react-native-vector-icons/Feather';
import DownLoad from 'react-native-vector-icons/Entypo';
import Song from '../../../Assets/Images/p.png'
import RNFetchBlob from 'rn-fetch-blob'
import Loading from '../../Components/Loading'
const Download = ({route}) => {
    debugger
    const navigation = useNavigation()
    const { id, tokenn } = route.params
    const [downloaded, setDownloaded] = useState([])
    const [process, setprocess] = useState(false)
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        DownloadSongs();
    }, [])
    const getPermission = async (url, title) => {
       
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        if (granted) {
            startDownload(url,title)

        }else{
            alert("Please allow access to storage from settings")
        }
    }
    const startDownload = (url, title) => {

        RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                title: title,
                path: RNFetchBlob.fs.dirs.DownloadDir +'/'+ title,
                description: 'Downloading Songs'
            }
        }).fetch('GET', url).then(
            (res) => {
                console.log(res)
            }
        ).catch(error => {
            console.log(error)
        }) 
    }
    const DownloadSongs = async () => {
        setprocess(true)
        const Server = new AppServices();
        // let token = "89|eZaX2zvcTHNw1ArkIHiNwQwGSQTaBxU8s2Ouu4lf"
        debugger
        const res = await Server.downloadSong(tokenn, id)
        try {
            if (res.data) {
                let albumData = res.data.data.songs
                setDownloaded(albumData)
                setRefresh(!refresh)
            }
        } catch (err) {
            setprocess(false)
            console.log(err)
        }
        setprocess(false)
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
                <View style={{
                    width: 350, paddingVertical: 20, backgroundColor: '#000', borderRadius: 20, marginVertical: 5,  borderWidth: 0.8, borderColor: "#031489",
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,
                    elevation: 24
                }} onPress={() => navigation.navigate('Download', {
                    id: item.id,
                })}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Image source={Song} style={{ height: 40, width: 40, borderRadius: 99, marginHorizontal: 10 }} />
                            <View style={{paddingLeft:5}}>  
                                <Text style={[styles.Text, { fontSize: 14, marginVertical: 3 }]}>{item.title}</Text>
                                {/* <Text style={[styles.Text, { fontSize: 10, marginVertical: 3 }]}>Artist : {item.artist_name}</Text> */}
                                <Text style={[styles.Text, { fontSize: 10, marginVertical: 3 }]}>Duration : {item.duration}</Text>

                                {/* <View style={{ marginVertical: 3, width: 70 }}>
                                    <ProgressBar progress={0.3} color="#031489" />
                                </View> */}

                            </View>
                        </View>

                        <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => getPermission(item.download_link,item.title)}>
                            <DownLoad name="download" size={20} color="#031489" />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }


    return (
        <View style={styles.body}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10, marginTop:20 }}>
           <TouchableOpacity onPress={() => navigation.pop()} style={{ width: 50 }}>
               <DownArrow name="arrow-left" size={20} color="#031489" />
           </TouchableOpacity>
       </View>
            <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "#0009" }}
                contentContainerStyle={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={{ marginTop: 10, paddingHorizontal: 10 }}>

                    <FlatList
                        data={downloaded}
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

export default Download