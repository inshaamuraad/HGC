import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loading() {
    return (
        <View style={{ position: "absolute", flex: 1, backgroundColor: "#0009", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", }}>
            <View style={{ backgroundColor: "#fff", padding: 40, borderRadius: 20 }}>
                <LottieView source={require('../../Assets/Lottie/load.json')} autoPlay loop />
            </View>
        </View>
    );
}
