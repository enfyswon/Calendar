import React, { useContext, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import { Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function BottomTabNavigationApp() {
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen initialRouteName="Home"
          name="달력"
          component={CalendarView}
          options={{
            tabBarIcon: ({color, size}) => (
              <AntDesign name="calendar" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="목록"
          component={ListView}
          options={{
            tabBarIcon: ({color, size}) => (
              <AntDesign name="bars" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="추가"
          component={AddView}
          options={{
            tabBarIcon: ({color, size}) => (
              <AntDesign name="plus" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function CalendarView() {
  const posts = [
    {
      id: 1,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2023-11-26",
    },
    {
      id: 2,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2023-11-27",
    }
  ];
  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = {marked: true};
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    }
  }

  return (
    <Calendar 
      style={styles.calendar} 
      markedDates={markedSelectedDates}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }} 
      onDayPress={(day) => {
        setSelectedDate(day.dateString)
      }} />
  );
}

function AddView() {
  return <Text>책 추가 화면</Text>
}

function ListView() {
  return <Text>읽은 책 목록 화면</Text>
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});

export default BottomTabNavigationApp;