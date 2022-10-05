import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import BG from '../../../Assets/Images/muss.jpeg'
import HD from '../../../Assets/Images/headPhone.png'
import styles from '../../../Assets/css/style';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/core';
import AppServices from '../../Server/AppServices';
import Validation from '../../Components/Validation';
import Logo from '../../../Assets/Icons/Logo.png'

const Register = () => {
    const navigation = useNavigation()
    const [name, setname] = useState('')
    const [userName, setuserName] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [process, setProcess] = useState(false);
    const [token, settoken] = useState('')
    const [textType, setTextType] = useState(true);
    const [texttype, setType] = useState(true);
    const [allAlert, setallAlert] = useState(false)
    const [emailAlert, setemailAlert] = useState(false)
    const [passmatchAlert, setPassMatchAlert] = useState(false)
    const [emailHandle, setEmailHanle] = useState('')
  



    const RegisterData = async () => {
        setallAlert(false)
        setPassMatchAlert(false)
        setemailAlert(false)
        const Storage = new AppServices;
        const validation = new Validation();
        var checkEmail = validation.emailValidation(email);
        var checkPassword = validation.passwordValidation(password);
        var checkConfirmPassword = validation.confirmPasswordValidation(confirmPassword);
        var checkName = validation.nameValidation(name);
        var checkUserName = validation.usernameValidation(userName);
        var passwordMatched = validation.passwordNotMatchedValidation(password, confirmPassword)

        try {
            if (checkName == true &&  checkEmail == true && checkPassword == true && checkConfirmPassword == true && passwordMatched == true && checkUserName == true) {
                let res = await Storage.storeRegisterData(name, email.toLowerCase(), userName, password, confirmPassword)
                if (res.data.status == "Success") {
                    
                    navigation.navigate('SimplerOtpVerfication',{
                        email: res.data.data.user.email
                    });
                    alert('Verfication email has sent to your Email')

                } else if (res == true) {
                    setallAlert("6")
                }
            } else {
                if (checkName != true) {
                    setallAlert("1")
                } else if (checkEmail != true) {
                    setallAlert("2")
                } else if (checkUserName != true) {
                    setallAlert("3")
                } else if (checkPassword != true) {
                    setallAlert("4")
                } else if (checkConfirmPassword != true) {
                    setallAlert("5")
                } else if (passwordMatched != true) {
                    setPassMatchAlert(true)
                }
            }
        }
        catch (error) {
            if (res == true) {
                setallAlert("6")
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
                <View style={{ width: 140, height: 140, borderRadius: 999, borderWidth: 4, alignItems: 'center', justifyContent: 'center', borderColor: '#031489' }}>
                                <Image style={{ width:120, height: 120 }} source={Logo} />
                            </View>
                    <Text style={{ color: '#fff', marginTop: 5, fontWeight: 'bold' }}>Register yourself with us!!</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 30, borderRadius: 100, marginTop: 30 }}>
                        <TextInput
                            style={[styles.textInput, { borderRadius: 20, backgroundColor: 'transparent', borderWidth: 1, borderColor: 'gray', fontSize: 12, color: '#fff' }]}
                            placeholder="Enter Your Name"
                            placeholderTextColor="#fff"
                            onChangeText={text => setname(text)}

                        />
                    </View>
                    {allAlert == "1" && <>
                        <Text
                            style={{
                                fontSize: 10, color: "#fff", bottom: 5, marginRight: '50%'
                            }}
                        > * Enter your Full Name
                        </Text>
                    </>}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 30, borderRadius: 100, }}>
                        <TextInput
                            style={[styles.textInput, { borderRadius: 20, backgroundColor: 'transparent', borderWidth: 1, borderColor: 'gray', fontSize: 12, color: '#fff' }]}
                            placeholder="Enter Your Email ID"
                            placeholderTextColor="#fff"
                            onChangeText={text => setEmail(text)}
                        />
                    </View>

                    {allAlert == "6" && <>
                        <Text
                            style={{
                                fontSize: 10, color: "#fff", bottom: 5, marginRight: '50%'
                            }}
                        > * This Email is already taken
                        </Text>
                    </>}
                    {allAlert == "2" && <>
                        <Text
                            style={{
                                fontSize: 8, color: "#fff", bottom: 5, marginRight: '53%'
                            }}
                        > * Enter an Email Address
                        </Text>
                    </>}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 30, borderRadius: 100, }}>
                        <TextInput
                            style={[styles.textInput, { borderRadius: 20, backgroundColor: 'transparent', borderWidth: 1, borderColor: 'gray', fontSize: 12, color: '#fff' }]}
                            placeholder="Enter Your User Name"
                            placeholderTextColor="#fff"
                            onChangeText={text => setuserName(text)}
                        />
                    </View>
                    {allAlert == "3" && <>
                        <Text
                            style={{
                                fontSize: 10, color: "#fff", bottom: 5, marginRight: '50%'
                            }}
                        > * Enter Your User Name
                        </Text>
                    </>}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 30, borderRadius: 100 }}>
                        <TextInput
                            style={[styles.textInput, { borderRadius: 20, backgroundColor: 'transparent', borderWidth: 1, borderColor: 'gray', fontSize: 12, color: '#fff' }]}
                            placeholder="Enter Your Password"
                            secureTextEntry={texttype}
                            placeholderTextColor="#fff"
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
                    {allAlert == "4" && <>
                        <Text
                            style={{
                                fontSize: 10, color: "#fff", bottom: 5, marginRight: '50%'
                            }}
                        > * Enter Your Password
                        </Text>
                    </>}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 30, borderRadius: 100 }}>
                        <TextInput
                            style={[styles.textInput, { borderRadius: 20, backgroundColor: 'transparent', borderWidth: 1, borderColor: 'gray', fontSize: 12, color: '#fff' }]}
                            placeholder="Enter Your Confirm Password"
                            secureTextEntry={texttype}
                            placeholderTextColor="#fff"
                            onChangeText={text => setconfirmPassword(text)}

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
                    {allAlert == "5" && <>
                        <Text
                            style={{
                                fontSize: 10, color: "#fff", bottom: 5, marginRight: '45%'
                            }}
                        > * Enter Your Confirm Password
                        </Text>
                    </>}
                    {passmatchAlert == true && <>
                        <Text
                            style={{
                                fontSize: 10, color: "#ffff", bottom: 5, marginRight: '45%'
                            }}
                        > * Password Not Matched !
                        </Text>
                    </>}

                    <TouchableOpacity style={styles.buttonLogin} onPress={() => RegisterData()}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Register</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={{ color: '#fff', paddingVertical: 20 }}>
                            Already have an account ?{' '}

                        </Text>
                        <TouchableOpacity  >
                            <Text
                                style={{

                                    color: '#fff',
                                    fontWeight: 'bold',
                                    textDecorationLine: 'underline',
                                }}
                                onPress={() => navigation.navigate('Login')}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>



                </View>

            </ScrollView>

        </ImageBackground>
    );
};

export default Register;
