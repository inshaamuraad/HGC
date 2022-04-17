import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import BG from '../../../Assets/Images/image.jpeg'
import HD from '../../../Assets/Images/headPhone.png'
import styles from '../../../Assets/css/style';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/core';
import AppServices from '../../Server/AppServices';
import ApiServices from '../../Server/ApiServices';
import Validation from '../../Components/Validation';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [process, setProcess] = useState(false);
    const [textType, setTextType] = useState(true);
    const [texttype, setType] = useState(true);
    const [allAlert, setallAlert] = useState(false)

    useEffect(() => {
        setallAlert(false)
    }, [])
    const LoginData = async () => {
        setallAlert(false)
        const Storage = new AppServices;
        const validation = new Validation();
        var checkEmail = validation.emailValidation(email);
        var checkPassword = validation.passwordValidation(password);
        try {
            if (checkEmail == true && checkPassword == true) {
                let res = await Storage.storeLoginData(email.toLowerCase(), password)
                debugger
                if (res.data.status == "Success") {
                    const data = res.data.data
                    var u_name = data.user.name ? data.user.name : ''
                    var u_email = data.user.email ? data.user.email : ''
                    var u_avatar_url = data.user.avatar_url ? data.user.avatar_url : ''
                    var u_type = data.user.type ? data.user.type : ''
                    var token = data.token ? data.token : ''

                    const Server = new ApiServices;
                    var flag = await Server.loginData(
                        u_name,
                        u_email,
                        u_avatar_url,
                        u_type,
                        token
                    )
                    debugger

                    if (flag) {
                        debugger
                        navigation.navigate('HomeScreen')
                    }

                } else if (res.response.data.message) {
                    debugger

                }
            } else {
                if (checkEmail != true) {
                    setallAlert("1")
                } else if (checkPassword != true) {
                    setallAlert("2")
                }

            }
        }
        catch (error) {
            debugger
            if (res == true) {
                alert('Kindly procede with email verification before trying to login')
                setallAlert(false)

            }
        }

    }

    return (
        <ImageBackground source={BG} style={styles.body}>
            <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "#0009" }}
                contentContainerStyle={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={HD} style={{ width: 100, height: 100 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 30, borderRadius: 100, marginTop: 30 }}>
                        <TextInput
                            style={[styles.textInput, { borderRadius: 20, backgroundColor: 'transparent', borderWidth: 1, borderColor: 'gray', fontSize: 12, color: '#fff' }]}
                            placeholder="Enter Your Email ID"
                            placeholderTextColor="#B8B8B8"
                            onChangeText={text => setEmail(text)}

                        />
                    </View>
                    {allAlert == "1" && <>
                        <Text
                            style={{
                                fontSize: 12, color: "#B98E00", bottom: 5, marginRight: '45%'
                            }}
                        > * Enter an Email Address
                        </Text>
                    </>}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 30, borderRadius: 100 }}>
                        <TextInput
                            style={[styles.textInput, { borderRadius: 20, backgroundColor: 'transparent', borderWidth: 1, borderColor: 'gray', fontSize: 12, color: '#fff' }]}
                            placeholder="Enter Your Password"
                            secureTextEntry={texttype}
                            placeholderTextColor="#B8B8B8"
                            onChangeText={text => setPassword(text)}

                        />
                        <TouchableOpacity
                            style={{ paddingRight: 20, paddingBottom: 5, position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center', }}
                            onPress={() => setType(!texttype)}>
                            {texttype == true ? (
                                <Icon name="eye-with-line" size={15} color="#fff" />
                            ) : (
                                <Icon name="eye" size={15} color="#fff" />
                            )}
                        </TouchableOpacity>

                    </View>
                    {allAlert == "2" && <>
                        <Text
                            style={{
                                fontSize: 12, color: "#B98E00", bottom: 5, marginRight: '50%'
                            }}
                        > * Enter Your Password
                        </Text>
                    </>}


                    <TouchableOpacity style={{ width: '100%' }} onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text
                            style={{
                                color: '#fff',
                                textAlign: 'right',
                                paddingVertical: 10,
                                fontSize: 12,
                                textDecorationLine: 'underline',
                                paddingHorizontal: 30
                            }}>
                            Forgot Password ?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonLogin} onPress={() => LoginData()}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Login</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={{ color: '#fff', paddingVertical: 20 }}>
                            Don't have an account ?{' '}

                        </Text>
                        <TouchableOpacity  >
                            <Text
                                style={{

                                    color: '#fff',
                                    fontWeight: 'bold',
                                    textDecorationLine: 'underline',
                                }}
                                onPress={() => navigation.navigate('Register')}
                            >
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>



                </View>

            </ScrollView>

        </ImageBackground>
    );
};

export default Login;
