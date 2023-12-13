import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import { View, FlatList, Text, StyleSheet } from "react-native";
import axios, { Axios } from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

function CalendarView() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState([]);
  
  useEffect(() => {
    getBooks();
  }, [books]);

  const getBooks = () => {
    axios.get('http://192.168.0.174:3001/api/booklist')
    .then(res => {
      setBooks(res.data);
    })
    .catch(error => console.log(error));
  }

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
    axios.get('http://192.168.0.174:3001/api/bookday/' + date)
    .then(res => {
      setBook(res.data);
    })
    .catch (error => console.log(error));
  };

  return (
    <SafeAreaView>
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
      <View>
      <FlatList
        style={styles.bookTitle}
        data={book}
        renderItem={({ item }) => {
          return (
            <View style={styles.bookList}>
              <Text>{item.book_title}</Text>
            </View>
          );
      }}
      />
      </View>
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
    margin: 5,
    padding: 20
  }
});

export default CalendarView;
