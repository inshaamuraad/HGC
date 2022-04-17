
import React ,{useEffect}from 'react';
import { View, Text , Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../Assets/Icons/Logo.png'

const Splash = ({navigation}) => {

useEffect(() => {
 
  
  
   setTimeout(() => {
     navigation.navigate('Handler')
   }, 3000)
}, [])


    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}> 
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: '#000'}}>
        <View style={{width: 250, height: 250, borderRadius: 999, borderWidth: 4,alignItems: 'center', justifyContent: 'center' , borderColor: '#031489'}}>  
<Image  style={{width: 191, height: 196}} source={Logo}/>
        </View>
      </View>
      </SafeAreaView>
    );
  }
  export default Splash;
  