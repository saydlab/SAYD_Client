import 'react-native-gesture-handler'
import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Provider as MainProvider} from './src/context/MainContext'
import {Provider as UserProvider} from './src/context/UserContext'
import {Provider as ServiceProvider} from './src/context/ServiceContext'
import Home from './src/screens/Home'
import Bookings from './src/screens/Bookings'
import Profile from './src/screens/Profile'
import Service from './src/screens/Service'
import ServiceTypes from './src/screens/ServiceTypes'
import ServiceList from './src/screens/ServiceList'
import ServiceDetail from './src/screens/ServiceDetail'
import Payment from './src/screens/Payment'
import Wallet from './src/screens/Wallet'
import Signup from './src/screens/Signup'
import ConfirmBooking from './src/screens/ConfirmBooking'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import {Context as UserContext} from './src/context/UserContext'


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeTab = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" 
        component={Home} 
        options={{ 
            headerTitle: () => <>
              <Text style={{fontSize:22, fontWeight:'bold'}}>SAYD</Text>
              <Text style={{fontSize:12}}>Chennai</Text>
              </>
          }} />
      <Stack.Screen name="Service" component={Service} />
      <Stack.Screen name="ServiceTypes" component={ServiceTypes} />
      <Stack.Screen name="ServiceList" component={ServiceList} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
      <Stack.Screen name="ConfirmBooking" component={ConfirmBooking} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  )
}

const BookingsTab = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Bookings" component={Bookings} />
    </Stack.Navigator>
  )
}

const ProfileTab = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  )
}

const WalletTab = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Wallet" component={Wallet} />
    </Stack.Navigator>
  )
}

const App = () =>{

  const [splash, setSplash] = React.useState(true)
  const {tryLocalSignin, state:{user_name}} = useContext(UserContext)

  React.useEffect(()=>{
    tryLocalSignin()
  },[])

  setTimeout(() => {
    setSplash(false)
  }, 2000);

  if(splash){
    return(
      <View style={{flex:1, alignItems:'center',justifyContent:'center',backgroundColor:'white'}} >
        <Text style={{fontSize:28}} >SAYD</Text>
        {/* <Image source={SplashImage} style={{ width: 200, height: 200 }} /> */}
      </View>
    )
  }

  if(!user_name){ 
    return(
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Sign up" component={Signup} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    )
  }
  else{
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator >
            <Tab.Screen name="HomeTab" component={HomeTab} options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              )}}
              />
            <Tab.Screen name="BookingsTab" component={BookingsTab} options={{
              tabBarLabel: 'Bookings',
              tabBarIcon: ({ color, size }) => (
                <Feather name="list" color={color} size={size} />
              )
            }} 
              />
            {/* <Tab.Screen name="WalletTab" component={WalletTab} options={{
              tabBarLabel: 'Wallet',
              tabBarIcon: ({ color, size }) => (
                <Entypo name="wallet" color={color} size={size} />
              )
            }} 
              /> */}
            <Tab.Screen name="ProfileTab" component={ProfileTab} options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="face-profile" color={color} size={size} />
              )
            }} 
              />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    )
  }
  
}

export default ()=>{
  return(
    <ServiceProvider>
      <UserProvider>
        <MainProvider>
          <App/>
        </MainProvider>
      </UserProvider>
    </ServiceProvider>
  )
} 