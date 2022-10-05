import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    ImageBackground,
    Button
} from 'react-native';
import HD from '../../Assets/Images/mic.png'

import styles from '../../Assets/css/style';
import { useNavigation } from '@react-navigation/native';
import AppServices from '../Server/AppServices';
import BG from '../../Assets/Images/HdLive.jpeg'
import Loading from '../Components/Loading'
import Logo from '../../Assets/Icons/Logo.png'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [process, setProcess] = useState(false)
    const navigation = useNavigation();
    const ForgetPasswordd = async () => {
        setProcess(true);
        const server = new AppServices();
        var res = await server.forgetPassword(email.toLowerCase())
        debugger
        try {
            if (res.data.status == "Success") {
                alert(res.data.data)
                navigation.navigate('Otp')
                alert('Your OTP is sent to your Email')
            }
            else {
                debugger
                alert(res)
            }

        } catch (error) {
            setProcess(false);
            alert(res.response.data.message)
        }
        setProcess(false);
    };
    return (
        <ImageBackground source={BG} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "#0009" }}
                contentContainerStyle={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, }}>
                    <View style={[styles.loginContainer, {
                        width: "100%", shadowOffset: {
                            width: 0,
                            height: 15,
                        },
                        shadowOpacity: 0.60,
                        shadowRadius: 15.00,
                        elevation: 20, shadowColor: '#031489'
                    }]}>
                        <View style={{ width: 120, height: 120, padding: 10 }}>
                            <View style={{ width: 110, height: 110, borderRadius: 999, borderWidth: 4, alignItems: 'center', justifyContent: 'center', borderColor: '#031489' }}>
                                <Image style={{ width: 90, height: 90 }} source={Logo} />
                            </View>
                        </View>
                        <Text style={{ paddingVertical: 20, color: '#000' }}> Reset your Password</Text>
                        <TextInput
                            style={[styles.textInput, { borderRadius: 30, height: 40, fontSize: 12,
                                borderColor:'#031489', borderWidth: 1}]}
                            placeholder="Enter Your Email ID"
                            placeholderTextColor="#031489"
                            onChangeText={text => setEmail(text)}
                        />

                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => ForgetPasswordd()}>
                            <View style={{ width: 200, height: 40, backgroundColor: '#031489', borderRadius: 999, justifyContent: 'center', alignItems: 'center' }}>

                                <Text style={{ fontSize: 14, color: '#fff', alignSelf: 'center' }}>Done</Text>

                            </View>


                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={{ color: '#fff', paddingVertical: 20 }}>
                            Already have an account ?{' '}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                            <Text
                                style={{

                                    color: '#fff',
                                    fontWeight: 'bold',
                                    textDecorationLine: 'underline',
                                }}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {process == true &&
                <Loading />
            }
        </ImageBackground>
    );
};
export default ForgotPassword;
