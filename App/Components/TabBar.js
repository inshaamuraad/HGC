import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

import Ionicons from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';


export default function TabBar({ state, descriptors }) {
    

    const navigation = useNavigation();
    

    const MainIcon=({ text, focusicon, icon, index})=> {
        const isFocused = state?.index === index;
        return (<View style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        }}>
            <TouchableOpacity onPress={() => handleClick(text)}>
            <Ionicons name={isFocused?focusicon:icon} size={26} color="#031489" />
            </TouchableOpacity>
            <Text style={{
                fontSize: 10,
                color: '#031489'
            }}>{text}</Text>
        </View>);
    }

    const handleClick=(screen)=>{
        switch (screen) {
            case "Home":
                navigation.navigate('HomeScreen')
                break;
            case "RadioLive":
                navigation.navigate('RadioLive')
                break;
            default:
                break;
        }
    }

    return (
        <View style={{ flexDirection: 'row', backgroundColor: '#e3e3e3e3',paddingBottom:20,padding:10,
             shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: -2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 10.32,
                elevation: 8,
        }}>
            <MainIcon text="Home"  icon="home" focusicon="home" index={0}></MainIcon>
            <MainIcon text="RadioLive" icon="popup" focusicon="popup" index={1} ></MainIcon>
        </View>

    );
}
