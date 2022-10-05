import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import White from '../../Assets/Icons/Logo.png';
import LanguageIcon from 'react-native-vector-icons/FontAwesome';
import Schedule from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Contact from 'react-native-vector-icons/Entypo';
import Exit from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ApiServices from '../Server/ApiServices';
import { useIsFocused } from '@react-navigation/core';

export default function DrawerContent(props) {
    const navigation = useNavigation();
    const Fcoused = useIsFocused()
    const [token, setToken] = useState('')

    useEffect(() => {
        Fcoused && Tokenn()
    }, [Fcoused])

    const Tokenn = async () => {
        let u_toke = ""
        const Storage = new ApiServices()
        u_toke = await Storage.getToken()
        setToken(u_toke)
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <DrawerContentScrollView  {...props} style={{ color: '#fff' }} >
                <View style={{ alignItems: 'center', paddingVertical: 20, backgroundColor: '#fff', top: 0 }}>
                    <View style={{ width: 120, height: 120, borderRadius: 999, borderWidth: 4, alignItems: 'center', justifyContent: 'center', borderColor: '#031489' }}>
                        <Image
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                            source={White} />
                    </View>
                    <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#031489' }}>WELCOME</Text>
                </View>
                <View style={{ width: '100%', height: 0.7, borderWidth: 0.2, borderColor: '#031489', marginTop: 0 }}></View>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 5, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('Tabs')}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <LanguageIcon
                            name="home"
                            size={20}
                            color='#031489' />
                        <Text style={{ marginLeft: 10, color: '#031489' }}>Home</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('Play/History')}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <LanguageIcon
                            name="history"
                            size={20}
                            color='#031489'

                        />
                        <Text style={{ marginLeft: 10, color: '#031489' }}>Play/History</Text>

                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('Schedule')}>

                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <Schedule
                            name="schedule"
                            size={20}
                            color='#031489'

                        />
                        <Text style={{ marginLeft: 10, color: '#031489' }}>Schedule</Text>

                    </View>

                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('Gospel Websites')}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <LanguageIcon
                            name="history"
                            size={20}
                            color='#031489'

                        />
                        <Text style={{ marginLeft: 10, color: '#031489' }}>Gospel Websites</Text>

                    </View>

                </TouchableOpacity>


                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('Engineers')}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <Schedule
                            name="engineering"
                            size={20}
                            color='#031489'

                        />
                        <Text style={{ marginLeft: 10, color: '#031489' }}>Engineers</Text>

                    </View>

                </TouchableOpacity>
                <View style={{ width: '100%', height: 0.7, borderWidth: 0.2, borderColor: '#031489', marginTop: 30 }}></View>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}>
                    <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: 'bold' }}>Others</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('GuestBook')}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <AntDesign
                            name="team"
                            size={20}
                            color='#031489'

                        />
                        <Text style={{ marginLeft: 10, color: '#031489' }}>GuestBook</Text>

                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('Contact')}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <Contact
                            name="mobile"
                            size={20}
                            color='#031489'

                        />
                        <Text style={{ marginLeft: 10, color: '#031489' }}>Contact</Text>

                    </View>

                </TouchableOpacity>
            </DrawerContentScrollView>


            {token == false ?
                <TouchableOpacity style={{ marginBottom: 15, borderTopWidth: 1, borderTopColor: '#fff' }} >
                    {/* <DrawerItem icon={({ color, size }) => (
                        <Exit
                            name="exit-to-app"
                            size={size}
                            color='#CB3BF7'

                        />
                    )}
                        labelStyle={{ color: '' }}
                        label='Logout'
                        onPress={() => navigation.navigate('Logout')}
                    /> */}
                </TouchableOpacity>
                :
                <TouchableOpacity style={{ marginBottom: 15, borderTopWidth: 1, borderTopColor: '#031489' }} >
                    <DrawerItem icon={({ color, size }) => (
                        <Exit
                            name="exit-to-app"
                            size={size}
                            color='#031489'

                        />
                    )}
                        labelStyle={{ color: '#031489' }}
                        label='Logout'
                        onPress={() => navigation.navigate('Logout')}
                    />
                </TouchableOpacity>
            }
        </View>
    );
}
