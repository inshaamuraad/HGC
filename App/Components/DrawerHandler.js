import React from 'react';
import { View, Text } from 'react-native';
import HomeScreen from '../Screens/HomeScreen';
import History from '../Screens/MenuScreens/History';
import Schedule from '../Screens/MenuScreens/Schedule';
import Gospel from '../Screens/MenuScreens/Gospel';
import GuestBook from '../Screens/MenuScreens/GuestBook';
import Contact from '../Screens/MenuScreens/Contact';
import About from '../Screens/MenuScreens/About';
import Engineers from '../Screens/MenuScreens/Engineers';
import WeeklySchedule from '../Screens/Engineer/WeeklySchedule';


export default function DrawerHandler() {
    return (
        <Drawer.Navigator initialRouteName="HomeScreen">
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            <Drawer.Screen name="Play/History" component={History} options={{ headerShown: false }} />
            <Drawer.Screen name="Schedule" component={Schedule} options={{ headerShown: false }} />
            <Drawer.Screen name="Gospel" component={Gospel} options={{ headerShown: false }} />
            <Drawer.Screen name="GuestBook" component={GuestBook} options={{ headerShown: false }} />
            <Drawer.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
            <Drawer.Screen name="About" component={About} options={{ headerShown: false }} />
            <Drawer.Screen name="Engineers" component={Engineers} options={{ headerShown: false }} />
            <Drawer.Screen name="WeeklySchedule" component={WeeklySchedule} />
        </Drawer.Navigator>
    );
}
