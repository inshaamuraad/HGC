import React, { useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import TopMenu from '../../Components/TopMenu';
import styles from '../../../Assets/css/style';
import DownMusicBar from '../../Components/DownMusicBar';
import { Button } from 'react-native-paper';
import Header from '../../Components/Header';
import { useNavigation } from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';
import AppServices from '../../Server/AppServices';
import { useRoute } from '@react-navigation/native';
import DownArrow from 'react-native-vector-icons/Feather';
export default function Comments({ route }) {

    const { params } = route
    const routee = useRoute();
    const navigation = useNavigation()
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [country, setcountry] = useState('')
    const [city, setcity] = useState('')
    const [state, setstate] = useState('')
    const [message, setmessage] = useState('')
    const [process, setprocess] = useState(false)


    const getContact = async (id) => {
        setprocess(true)
        const Storage = new AppServices();
        var res = await Storage.commentStore(name, email, country, city, state, id, message);
        try {
            if (res.data.status == "Success") {
                navigation.navigate('WeeklySchedule')
                setname('')
                setemail('')
                setcountry('')
                setcity('')
                setstate('')
                setmessage('')

            }
        } catch (err) {
            setprocess(false)
            console.log(err)
        }

        setprocess(false)
    }

    return (
        <SafeAreaView style={styles.body}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 20 }}>
                <TouchableOpacity onPress={() => navigation.pop()} style={{ width: 80 }}>
                    <DownArrow name="arrow-left" size={20} color="#031489" />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , marginRight: 50}}>
                    <Text style={{ alignSelf: 'center', color: '#031489', fontWeight: 'bold' }}>{routee.name}</Text>
                </View>
            </View>
            <ScrollView>
                <View style={[styles.InputContainer, { marginTop: 30 }]}>
                    <TextInput placeholder="First Name"
                        placeholderTextColor="#031489"
                        onChangeText={(text) => setname(text)}
                style={{ color: "#031489" }}

                    />
                </View>
                <View style={[styles.InputContainer]}>
                    <TextInput placeholder="Enter Email"
                        placeholderTextColor="#031489"
                        onChangeText={(text) => setemail(text)}
                style={{ color: "#031489" }}

                    />
                </View>
                <View style={[styles.InputContainer]}>
                    <TextInput placeholder="Country"
                        placeholderTextColor="#031489"
                        onChangeText={(text) => setcountry(text)}
                style={{ color: "#031489" }}

                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={[styles.InputContainerDouble, {  width: 180,}]}>
                        <TextInput placeholder="Enter City"
                            placeholderTextColor="#031489"
                            onChangeText={(text) => setcity(text)}
                style={{ color: "#031489" }}

                        />
                    </View>
                    <View style={[styles.InputContainerDouble, {  width: 180,}]}>
                        <TextInput placeholder="Enter State"
                            placeholderTextColor="#031489"
                            onChangeText={(text) => setstate(text)}
                style={{ color: "#031489" }}

                        />
                    </View>
                </View>
                <View style={{
                   height :40,
                    backgroundColor: '#fff',
                    borderWidth: 0.8,
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    marginHorizontal: 10,
                    marginVertical: 4,
                    borderColor: '#fff',
                    elevation: 10,
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,

                }}>
                    <TextInput placeholder="Enter Message"
                        placeholderTextColor="#031489"
                        onChangeText={(text) => setmessage(text)}
                        multiline />
                </View>
                <Button
                    mode="contained"
                    style={styles.btnContainer}
                    onPress={() => getContact(params.id)}>
                    SUBMIT
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}
