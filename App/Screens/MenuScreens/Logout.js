import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../Assets/css/style';
import { useNavigation } from '@react-navigation/native';
import ApiServices from '../../Server/ApiServices';

export default function Logout() {
    const navigation = useNavigation();
    const _logout = async () => {
        const storage = new ApiServices();
        try {
            await storage.getLogout();
            debugger
            global.u_type = null;
            global.token = null;
            navigation.reset({ index: 0, routes: [{ name: 'Splash' }] })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ position: "absolute", zIndex: 9999, flex: 1, backgroundColor: "#e2ebf4", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", padding: 20 }}>
                <View style={{ backgroundColor: "#fff", borderRadius: 20, padding: 20, width: "100%" }}>
                    <View style={{ flexDirection: "row", }}>
                        <TouchableOpacity style={[styles.buttonRed, { flex: 1, margin: 10 }]}
                            onPress={() => navigation.pop()}>
                            <Text style={{ color: "#fff", textAlign: "center", fontWeight: 'bold' }}>
                                Back
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonGreen, { flex: 1, margin: 10 }]}
                            onPress={() => _logout()}>
                            <Text style={{ color: "#000", textAlign: "center", fontWeight: 'bold' }}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
