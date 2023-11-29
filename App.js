import React, { useContext, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import {
  SafeAreaView,
  FlatList,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
// import AddView from "./pages/AddView";

const Tab = createBottomTabNavigator();

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
          component={AddView}
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
    },
  ];
  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), "yyyy-MM-dd");
    acc[formattedDate] = { marked: true };
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };

  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedSelectedDates}
      theme={{
        selectedDayBackgroundColor: "#009688",
        arrowColor: "#009688",
        dotColor: "#009688",
        todayTextColor: "#009688",
      }}
      onDayPress={(day) => {
        setSelectedDate(day.dateString);
      }}
    />
  );
}

function AddView() {
  const _onPressButton = () => {
    Alert.alert("방금 누르셨어용");
  };

  return (
    <SafeAreaView>
      <View style={styles.addTop}>
        <TouchableHighlight
          style={styles.addBook}
          id="addBook"
          onPress={_onPressButton}
          underlayColor="white"
        >
          <Text style={styles.searchText}>검색</Text>
        </TouchableHighlight>
        <View>
          <Text>읽은 날짜</Text>
          <Text>책제목</Text>
          <Text>작가</Text>
          <Text>출판사</Text>
        </View>
      </View>
      <View>
        <Text>⭐⭐⭐⭐⭐</Text>
        <Text>후기쓰는란</Text>
      </View>
    </SafeAreaView>
  );
}

function ListView() {
  const posts = [
    {
      id: 1,
      title: "첫번째 책.",
      contents: "내용입니다.",
      date: "2023-11-26",
    },
    {
      id: 2,
      title: "두번째 책.",
      contents: "내용입니다.",
      date: "2023-11-27",
    },
  ];
  return (
    <SafeAreaView>
      <FlatList
        data={[...posts]}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  addTop: {
    display: "flex",
    flexDirection: "row",
  },
  addBook: {
    borderColor: "black",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    width: 50,
    height: 70,
    textAlign: "center",
  },
  searchText: {
    // fontSize: 10,
    color: "lightgrey",
  },
});

export default BottomTabNavigationApp;
