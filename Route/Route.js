// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Splash from '../App/Screens/Splash'
import HomeScreen from '../App/Screens/HomeScreen';
import TabBar from '../App/Components/TabBar';
import History from '../App/Screens/MenuScreens/History';
import Schedule from '../App/Screens/MenuScreens/Schedule';
import Gospel from '../App/Screens/MenuScreens/Gospel';
import GuestBook from '../App/Screens/MenuScreens/GuestBook';
import Contact from '../App/Screens/MenuScreens/Contact';
import About from '../App/Screens/MenuScreens/About';
import Engineers from '../App/Screens/MenuScreens/Engineers';
import WeeklySchedule from '../App/Screens/Engineer/WeeklySchedule';
import AlbumCatlog from '../App/Screens/Engineer/AlbumCatlog';
import Comments from '../App/Screens/MenuScreens/Comments';
import DrawerContent from '../App/Components/DrawerContent';
import BuyAlbum from '../App/Screens/Engineer/BuyAlbum';
import SongScreen from '../App/Screens/Engineer/SongScreen';
import Login from '../App/Screens/MenuScreens/Login';
import Register from '../App/Screens/MenuScreens/Register'
import OtpVerify from '../App/Screens/MenuScreens/OtpVerify'
import ForgotPassword from '../App/Components/ForgotPassword';
import SimplerOtpVerfication from '../App/Components/SimplerOtpVerfication';
import Logout from '../App/Screens/MenuScreens/Logout';
import RadioLive from '../App/Screens/MenuScreens/RadioLive';
import SellAlbum from '../App/Screens/Engineer/SellAlbum';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabsNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="AlbumCatlog" component={AlbumCatlog} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
const DrawerHandle = () => {
  return (
    <Drawer.Navigator initialRouteName="Tabs" drawerPosition="left" drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Play/History" component={History} options={{ headerShown: false }} />
      <Drawer.Screen name="Schedule" component={Schedule} options={{ headerShown: false }} />
      <Drawer.Screen name="Gospel" component={Gospel} options={{ headerShown: false }} />
      <Drawer.Screen name="GuestBook" component={GuestBook} options={{ headerShown: false }} />
      <Drawer.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
      <Drawer.Screen name="About" component={About} options={{ headerShown: false }} />
      <Drawer.Screen name="Engineers" component={Engineers} options={{ headerShown: false }} />
      <Drawer.Screen name="Tabs" component={TabsNavigation} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
function Route() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="WeeklySchedule" component={WeeklySchedule}  options={{headerShown:false}}/>
        <Stack.Screen name="Song" component={SongScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="BuyAlbum" component={BuyAlbum}  options={{ headerShown: false }}/>
        <Stack.Screen name="Comment" component={Comments}  options={{ headerShown: false }}/>
        <Stack.Screen name="Handler" component={DrawerHandle} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Otp" component={OtpVerify} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="SimplerOtpVerfication" component={SimplerOtpVerfication} options={{ headerShown: false }} />
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        <Stack.Screen name="RadioLive" component={RadioLive} options={{ headerShown: false }}/>
        <Stack.Screen name="Sell Album" component={SellAlbum} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;