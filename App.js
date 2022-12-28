import React, { useEffect } from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';


import Home from './screens/Home';
import Quiz from './screens/Quiz';
import Result from './screens/Result';


const Stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen options={{headerShown: false}} name="Quiz" component={Quiz} />
        <Stack.Screen options={{headerShown: false}} name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
