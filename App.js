import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Home from "./src/Screens/Home";
import SearchBook from "./src/Screens/SearchBook";

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="도서 검색" component={SearchBook} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
