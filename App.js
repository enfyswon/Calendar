import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import CalendarView from "./src/Screens/CalenderView";
import AddBook from "./src/Screens/AddBook";
import ListView from "./src/Screens/ListView";
import Test from "./src/Screens/Test";

function BottomTabNavigationApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          initialRouteName="Home"
          name="달력"
          component={CalendarView}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="calendar" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="목록"
          component={ListView}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="bars" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="추가"
          component={AddBook}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="plus" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default BottomTabNavigationApp;
