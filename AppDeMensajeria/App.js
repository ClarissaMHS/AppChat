import React from 'react';

// SOLUCIÓN TEMPORAL PARA WORKLETS
if (__DEV__) {
  try {
    global.__workletsEnabled = false;
    console.log('✅ Worklets deshabilitados temporalmente');
  } catch (error) {
    // Ignorar errores
  }
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "./screens/Chat";

const Stack = createStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  );
}

export default function App() {
  return <RootNavigator />;
}