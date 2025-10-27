import React from 'react';

// SOLUCIÓN TEMPORAL PARA WORKLETS
if (__DEV__) {
  try {
    global.__workletsEnabled = false;
    console.log('Worklets deshabilitados temporalmente');
  } catch (error) {
    // Ignorar errores
  }
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "./Frontend/screens/Chat";
import Login from "./Frontend/screens/Login";
import Signup from "./Frontend/screens/Signup";
import Home from "./Frontend/screens/Home";

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

export default function App() {
  return <RootNavigator />;
}