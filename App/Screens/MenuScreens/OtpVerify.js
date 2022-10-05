import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LottieView from 'lottie-react-native';
import BG from '../../../Assets/Images/muss.jpeg'
import styles from '../../../Assets/css/style';
import { useNavigation } from '@react-navigation/native';
import AppServices from '../../Server/AppServices';
const OtpVerify = ({ route }) => {

    const { params } = route
    const navigation = useNavigation();
    const [otpCode, setotpCode] = useState('')


    const [chechVerify, setchechVerify] = useState(false)
    const OTPHandle = async (code) => {
        const server = new AppServices();
        var res = await server.OTPVerify(code)
        
        try {
            if (res.data.status == "Success") {
                navigation.navigate('Login')
                alert('Successfully Verified, Your New Password is :' + res.data.data)
            }
            else {
                setchechVerify(true)
            }
        } catch (error) {
            setchechVerify(true)

        }
    }



    return (
        <ImageBackground source={BG} style={{
            alignSelf: "stretch",
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,


        }}>
            <ScrollView style={{ flex: 1, alignSelf: "stretch", backgroundColor: "#0009" }}
                contentContainerStyle={{ flex: 1 }}
                contentContainerStyle={{
                    flexGrow: 1, justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={{
                    padding: 30, alignSelf: "stretch",
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                    <View style={[styles.loginContainer, { width: "100%" }]}>
                        <LottieView source={require('../../../Assets/Lottie/OtpCodee.json')} style={{ width: 150, height: 150 }} autoPlay loop />
                        <View style={{ marginTop: 30, alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center' }}>Verification Code</Text>
                            <Text style={{ color: '#1E0F2F', marginTop: 10, fontSize: 10 }}> We have sent the code verification to your email address </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                <OTPInputView
                                    style={{ width: '80%', height: 200 }}
                                    pinCount={4}
                                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                    onCodeChanged={code => setotpCode(code)}
                                    autoFocusOnLoad
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                    onCodeFilled={code => OTPHandle(code)} />
                            </View>

                        </View>
                    </View>

                    {chechVerify == true &&
                        <>
                            <View style={{ position: "absolute",flex: 1, alignSelf: "center",backgroundColor: "#0009", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", }}>
                                <View style={{ width: 280, height: 280, backgroundColor: "#fff", alignItems: 'center', paddingHorizontal: 12, borderRadius: 5 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                                        <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold', paddingHorizontal: 10 }}>Verification Failed</Text>

                                    </View>
                                    <View>
                                        <Text style={{ color: 'purple', fontSize: 11, marginTop: 40 }}>Your OTP is incorrect, Please enter correct OTP</Text>
                                        <Text style={{ color: 'purple', fontSize: 10, fontWeight: 'bold', marginTop: 10, alignSelf: 'center' }}>Try again ...</Text>
                                    </View>

                                    <TouchableOpacity style={{ paddingHorizontal: 35, paddingVertical: 10, backgroundColor: 'purple', marginVertical: 40, borderRadius: 5 }}
                                        onPress={() => setchechVerify(false)}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>}
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default OtpVerify;



