import React,{useEffect} from 'react';
import { View, Text } from 'react-native';
import Index from './App/Index';

import TrackPlayer, { Capability } from 'react-native-track-player';

export default function App() {

useEffect(() => {
  first()
}, [])

async function first  (params) {
  await TrackPlayer.setupPlayer({})
  TrackPlayer.registerPlaybackService(() => require('./service'));
}
  

  return (
   <Index />
  );
}
