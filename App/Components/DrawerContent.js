import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
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
import { createDrawerNavigator } from '@react-navigation/drawer';


export default function DrawerContent(props) {
    const navigation = useNavigation();




    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <DrawerContentScrollView  {...props} style={{ color: '#000' }} >
                <View style={{ alignItems: 'center', paddingVertical: 20, backgroundColor: '#000', top: 0 }}>
                    <View style={{ width: 120, height: 120, borderRadius: 999, borderWidth: 4, alignItems: 'center', justifyContent: 'center', borderColor: '#031489' }}>
                        <Image
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                            source={White} />
                    </View>
                    <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#CB3BF7' }}>WELCOME</Text>
                </View>
                <View style={{ width: '100%', height: 0.7, borderWidth: 0.2, borderColor: '#CB3BF7', marginTop: 0 }}></View>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 5, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('Tabs')}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <LanguageIcon
                            name="home"
                            size={20}
                            color='#CB3BF7' />
                        <Text style={{ marginLeft: 10, color: '#CB3BF7' }}>Home</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('Play/History')}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <LanguageIcon
                            name="history"
                            size={20}
                            color='#CB3BF7'

                        />
                        <Text style={{ marginLeft: 10, color: '#CB3BF7' }}>Play/History</Text>

                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('Schedule')}>

                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <Schedule
                            name="schedule"
                            size={20}
                            color='#CB3BF7'

                        />
                        <Text style={{ marginLeft: 10, color: '#CB3BF7' }}>Schedule</Text>

                    </View>

                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('Gospel')}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <LanguageIcon
                            name="history"
                            size={20}
                            color='#CB3BF7'

                        />
                        <Text style={{ marginLeft: 10, color: '#CB3BF7' }}>Gospel</Text>

                    </View>

                </TouchableOpacity>


                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('Engineers')}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <Schedule
                            name="engineering"
                            size={20}
                            color='#CB3BF7'

                        />
                        <Text style={{ marginLeft: 10, color: '#CB3BF7' }}>Engineers</Text>

                    </View>

                </TouchableOpacity>
                <View style={{ width: '100%', height: 0.7, borderWidth: 0.2, borderColor: '#CB3BF7', marginTop: 30 }}></View>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}>
                    <Text style={{ marginLeft: 10, fontSize: 12 , fontWeight:'bold'}}>Others</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('GuestBook')}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <AntDesign
                            name="team"
                            size={20}
                            color='#CB3BF7'

                        />
                        <Text style={{ marginLeft: 10, color: '#CB3BF7' }}>GuestBook</Text>

                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, marginLeft: 10, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('Contact')}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <Contact
                            name="mobile"
                            size={20}
                            color='#CB3BF7'

                        />
                        <Text style={{ marginLeft: 10, color: '#CB3BF7' }}>Contact</Text>

                    </View>

                </TouchableOpacity>
            </DrawerContentScrollView>



            <TouchableOpacity style={{ marginBottom: 15, borderTopWidth: 1, borderTopColor: '#CB3BF7' }} >

                <DrawerItem icon={({ color, size }) => (
                    <Exit
                        name="exit-to-app"
                        size={size}
                        color='#CB3BF7'

                    />
                )}
                    labelStyle={{color:''}}
                    label='Logout'
                    onPress={() => navigation.navigate('Logout')}

                />


            </TouchableOpacity>



        </View>
    );
}
