
import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../Assets/Icons/Logo.png'

const Splash = ({ navigation }) => {
  useEffect(() => {



    setTimeout(() => {
      navigation.navigate('Handler')

    }, 3000)
  }, [])


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <View style={{ width: 200, height: 200, borderRadius: 999, borderWidth: 4, alignItems: 'center', justifyContent: 'center', borderColor: '#031489' }}>
          <Image style={{ width: 185, height: 191}} source={Logo} />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default Splash;
