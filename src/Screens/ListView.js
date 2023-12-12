import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList, Text, StyleSheet } from "react-native";

function ListView() {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    try {
      axios.get('http://192.168.0.174:3001/api/booklist')
      .then(res => {
        setBooks(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={books}
        renderItem={({ item }) => {
          return (
            <View style={styles.bookList}>
              <Text>{item.book_id}</Text>
              <Text>{item.book_title}</Text>
              <Text>{item.book_author}</Text>
              <Text>{item.book_date}</Text>
            </View>
          );
      }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bookList: {
    margin: 20,
    padding: 5,
    backgroundColor: "teal"
  }
});

export default ListView;
