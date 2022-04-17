import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ApiServices extends React.Component {
    loginData = async (

        name,
        email,
        avatar_url,
        u_type,
        token



    ) => {
        try {
            await AsyncStorage.setItem('@name', name),
                await AsyncStorage.setItem('@email', email),
                await AsyncStorage.setItem('@avatar_url', avatar_url),
                await AsyncStorage.setItem('@u_type', u_type),
                await AsyncStorage.setItem('@token', token)
                return true
                debugger
        } catch (e) {
            console.log(e)
            return false
        }

    }

    getToken = async () => {
        
        try {
            const value = await AsyncStorage.getItem('@token')
            if (value != null) {
                

                return value;
            }
            return false;
        } catch (e) {
            return false;

        }

    }


    getUserType = async () => {
        
        try {
            const value = await AsyncStorage.getItem('@u_type')
            if (value != null) {
                

                return value;
            }
            return false;
        } catch (e) {
            return false;

        }

    }

getLogout = async() => {
   
    try {

    
        await AsyncStorage.removeItem('@token')
        await AsyncStorage.removeItem('@u_type')

    } catch {
        return false;
    }

    
}





}