import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 

function ListView() {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    axios.get('http://192.168.0.174:3001/api/booklist')
    .then(res => {
      setBooks(res.data);
    })
    .catch(error => console.log(error));
  }

  const deleteBook = ((id) => {
    axios.delete('http://192.168.0.174:3001/api/delete/' + id)
    .then(res => {
      console.log(res.data);
      getBooks();
    })
    .catch(error => console.log(error));
  });

  return (
    <SafeAreaView>
      <FlatList
        data={books}
        keyExtractor={(item) => item.book_id}
        renderItem={({ item }) => {
          return (
            <View style={styles.addTop}>
              <Image
              style={styles.addBook}
              id="addBook"
              underlayColor="white"
              source={{uri: item.book_thumbnail}}
            ></Image>
              <View style={styles.bookItem}>
                <Text>{item.book_id}</Text>
                <Text>{item.book_title}</Text>
                <Text>{item.book_author}</Text>
                <Text>{item.book_date}</Text>
              </View>
              <TouchableOpacity
               style={styles.deleteIcon}
               onPress={() => {
                alert("삭제버튼" + item.book_id);
                deleteBook(item.book_id);
              }}>
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
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
  },
  addTop: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddig: 5,
    backgroundColor: "teal"
  },
  addBook: {
    width: 115,
    height: 173,
    borderRadius: 3,
    borderWidth: 2,
    margin: 5,
    marginRight: 15,
    backgroundColor: "white"
  },
  bookItem: {
    margin: 5,
    width: "50%",
  },
  deleteIcon: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ListView;
