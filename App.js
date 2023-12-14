import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Home from "./src/Screens/Home";
import SearchBook from "./src/Screens/SearchBook";
import DetailBook from "./src/Screens/DetailBook";
import AddBook from "./src/Screens/AddBook";
import Test from "./src/Screens/Test";

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="추가" component={AddBook} />
        <Stack.Screen name="도서 검색" component={SearchBook} />
        <Stack.Screen name="상세 조회" component={DetailBook} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
