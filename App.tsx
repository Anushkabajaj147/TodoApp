import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import Home from './source/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditableScreen from './source/EditScreen';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(()=>{
    SplashScreen.hide();
  },[]);
  const NativeStack=createNativeStackNavigator();
  return (
   <NavigationContainer>
    <NativeStack.Navigator>
    <NativeStack.Screen component={Home} name={'home'}  options={{headerShown:false}}/>
    <NativeStack.Screen component={EditableScreen} name={'EditScreen'}  options={{headerShown:false}}/>
    </NativeStack.Navigator>
   </NavigationContainer>
  );
};
export default App;