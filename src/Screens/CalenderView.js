import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  Button,
} from "react-native";
import axios, { Axios } from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

function CalendarView({ navigation }) {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState([]);

  useEffect(() => {
    try {
      axios.get("http://172.30.1.33:3001/api/booklist").then((res) => {
        setBooks(res.data);
      });
    } catch (e) {
      console.log(e);
    }

    getBook(format(new Date(), "yyyy-MM-dd"));
  }, []);

  useEffect(() => {
    try {
      axios.get("http://172.30.1.33:3001/api/booklist").then((res) => {
        setBooks(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  }, [books]);

  const markedDates = books.reduce((acc, current) => {
    const formattedDate = format(new Date(current.book_date), "yyyy-MM-dd");
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

  const getBook = (date) => {
    try {
      axios.get("http://172.30.1.33:3001/api/bookday/" + date).then((res) => {
        setBook(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
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
          getBook(day.dateString);
        }}
      />
      <View style={styles.test}>
        <FlatList
          style={styles.bookTitle}
          data={book}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={styles.bookList}
                onPress={() => {
                  navigation.navigate({
                    name: "추가",
                    params: {
                      book_id: item.book_id,
                      title: item.book_title,
                      authors: item.book_author,
                      publisher: item.book_publisher,
                      thumbnail: item.book_thumbnail,
                      review: item.book_review,
                      date: item.book_date,
                    },
                  });
                }}
              >
                <Text style={{ fontSize: 17 }}>
                  ●&nbsp;&nbsp;{item.book_title}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
      <Pressable
        style={styles.abbBtn}
        onPress={() => {
          navigation.navigate("추가");
        }}
      >
        <AntDesign name="plus" color={"white"} size={38} />
      </Pressable>
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
  bookTitle: {
    // margin: 5,
    padding: 20,
  },
  bookList: {
    margin: 5,
  },
  abbBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 53,
    height: 53,
    right: 15,
    backgroundColor: "#4dac27",
    borderRadius: 50,
    position: "absolute",
    right: 15,
    bottom: 25,
  },
});

export default CalendarView;
