import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import CreatAcount from './CreateAccount';
import Guideline from './GuideLine';
import Current from "react-native-vector-icons/AntDesign";
import History from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import DownArrow from 'react-native-vector-icons/Feather';


export default function SellAlbum() {
    const [tab, currentTab] = useState(true)
    const routee = useRoute();
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{
                    height: "100%",
                    width: "100%",
                }}>
                    {/* Buttons */}
                    <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 20 }}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <DownArrow name="arrow-left" size={20} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: 'bold' }}>{routee.name}</Text>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => currentTab(true)}
                                style={{ width: 150, height: 50, backgroundColor: '#292929', borderRadius: 5, justifyContent: 'center', alignItems: 'center' ,
                                shadowOffset: {
                                    width: 0,
                                    height: 15,
                                },
                                shadowOpacity: 0.60,
                                shadowRadius: 15.00,
                                elevation: 20, shadowColor: '#ff0065'}}>
                                <View style={{ flexDirection: 'row', }}>
                                    {/* <Image source={CurrentIcon} style={{ width: 20, height: 20 }} /> */}
                                    <Current name="book" size={20} color={tab ? "#CB3BF7" : '#A9A9A9'} />

                                    <Text style={{ paddingHorizontal: 5, fontSize: 14, color: tab ? "#CB3BF7" : '#A9A9A9', fontWeight: 'bold', alignSelf: 'center' }}>Guideline</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => currentTab(false)}
                                style={{ width: 150, height: 50, backgroundColor: '#292929', borderRadius: 5, justifyContent: 'center', alignItems: 'center',
                                shadowOffset: {
                                    width: 0,
                                    height: 15,
                                },
                                shadowOpacity: 0.60,
                                shadowRadius: 15.00,
                                elevation: 20, shadowColor: '#ff0065' }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <History name="login" size={20} color={!tab ? "#CB3BF7" : '#A9A9A9'} />
                                    <Text style={{ paddingHorizontal: 5, fontSize: 14, color: !tab ? "#CB3BF7" : '#A9A9A9', fontWeight: 'bold' }}>Logged</Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Buttons */}
                    {tab ? <Guideline /> : <CreatAcount />}
                </View>
            </ScrollView>
        </View>
    );
}
