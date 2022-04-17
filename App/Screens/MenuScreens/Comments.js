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
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <DownArrow name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: 'bold' }}>{routee.name}</Text>
                </View>
            </View>
            <ScrollView>
                <View style={[styles.InputContainer, { marginTop: 30 }]}>
                    <TextInput placeholder="First Name"
                        placeholderTextColor="#fff"
                        onChangeText={(text) => setname(text)}
                    />
                </View>
                <View style={[styles.InputContainer]}>
                    <TextInput placeholder="Enter Email"
                        placeholderTextColor="#fff"
                        onChangeText={(text) => setemail(text)}
                    />
                </View>
                <View style={[styles.InputContainer]}>
                    <TextInput placeholder="Country"
                        placeholderTextColor="#fff"
                        onChangeText={(text) => setcountry(text)}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={[styles.InputContainerDouble]}>
                        <TextInput placeholder="Enter City"
                            placeholderTextColor="#fff"
                            onChangeText={(text) => setcity(text)}
                        />
                    </View>
                    <View style={[styles.InputContainerDouble]}>
                        <TextInput placeholder="Enter State"
                            placeholderTextColor="#fff"
                            onChangeText={(text) => setstate(text)}
                        />
                    </View>
                </View>
                <View style={{
                    height: 250,
                    backgroundColor: '#000',
                    borderWidth: 0.8,
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    marginHorizontal: 10,
                    marginVertical: 4,
                    borderColor: '#CB3BF7'

                }}>
                    <TextInput placeholder="Enter Message"
                        placeholderTextColor="#fff"
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
