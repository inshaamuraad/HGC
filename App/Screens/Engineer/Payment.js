import React, { useState } from 'react'
import { View, Text, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import { useStripe } from '@stripe/stripe-react-native'
import AppServices from '../../Server/AppServices'
import ApiServices from '../../Server/ApiServices'
import LottieView from 'lottie-react-native';
import styles from '../../../Assets/css/style'
import { useNavigation } from '@react-navigation/core'
import DownArrow from 'react-native-vector-icons/Feather';

const Payment = ({ route }) => {
    const { payment, token, price } = route.params

    const navigation = useNavigation();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();


    const initPayment = async (client_secret) => {

        const { error } = await initPaymentSheet({
            paymentIntentClientSecret: client_secret,
            merchantDisplayName: "Hallelujah Choice Radio"
        });
        if (error) {
            alert(error.message)
        }
        if (!error) {
            openPaymentSheet();
        }
    }
    const openPaymentSheet = async () => {

        const { error } = await presentPaymentSheet();
        if (error) {
            if (error.code == 'Canceled') {
                return
            }
            else {
                alert(error.message)
            }
        } else {
        
                navigation.navigate('Purchase',{
                    token : token
                })
            alert('You have paid succesfully ')
            debugger
        }

    }

    const fetchPayment = async () => {

        const Server = new AppServices();
        const res = await Server.fetchPayment('Album', payment, token)
        initPayment(res.data.client_secret)
    }

    const paymentDone = () => {





    }
    return (
        <SafeAreaView style={styles.body}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 20 }}>
                <TouchableOpacity onPress={() => navigation.pop()} style={{ width: 80 }}>
                    <DownArrow name="arrow-left" size={20} color="#031489" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center", paddingVertical: 10, marginTop: 10 }}>
            <Text style={{ color: "#031489" , fontSize: 20}}>Stripe Payment Method</Text>

                <View style={{ alignItems: "center", paddingVertical: 10, marginTop: 10 }}>
                    <LottieView source={require('../../../Assets/Lottie/carrd.json')} style={{ width: 300, height: 300 }} autoPlay />
                </View>
                <Text style={{ color: "#000" }}>You can purchse your album by paying here!</Text>
                <Text style={{ color: "#000", marginVertical: 5, fontSize: 12 }}>Purchase your favourite album in ${price}</Text>

                <TouchableOpacity
                    onPress={() => fetchPayment()}
                    style={{ width: 140, paddingVertical: 15, justifyContent: "center", marginVertical: 50, alignItems: 'center', backgroundColor: "#031489", borderRadius: 10 }}>

                    <Text style={{ color: "#fff" }}>Pay Here</Text>

                </TouchableOpacity>



            </View>
        </SafeAreaView>
    )
}

export default Payment