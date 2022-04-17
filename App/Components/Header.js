import { View, Text ,TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();
    const route = useRoute();

  return (
      <View style={{}}>
    <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10 }}>
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Icon name="align-right" size={20} color="#fff" />
    </TouchableOpacity>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: 'bold' }}>{route.name}</Text>
    </View>
  </View>
  </View>
  );
};

export default Header;
