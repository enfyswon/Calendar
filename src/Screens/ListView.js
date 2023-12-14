import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

function ListView({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, [books]);

  const getBooks = () => {
    axios
      .get("http://172.30.1.33:3001/api/booklist")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => console.log(error));
  };

  const deleteBook = (id) => {
    axios
      .delete("http://192.168.0.174:3001/api/delete/" + id)
      .then((res) => {
        console.log(res.data);
        getBooks();
      })
      .catch((error) => console.log(error));
  };

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
                source={{ uri: item.book_thumbnail }}
              ></Image>
              <View style={styles.bookItem}>
                <Text style={styles.titleText}>{item.book_title}</Text>
                <Text style={styles.assistText}>{item.book_author}</Text>
                <Text style={styles.assistText}>{item.book_date}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => {
                  Alert.alert("삭제하시겠습니까?", "", [
                    {
                      text: "아니오",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "네",
                      onPress: () => {
                        deleteBook(item.book_id);
                      },
                    },
                  ]);
                }}
              >
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
    backgroundColor: "gray",
  },
  addTop: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddig: 5,
    backgroundColor: "white",
    borderBottomWidth: 1,
  },
  addBook: {
    width: 100,
    height: 140,
    borderRadius: 3,
    borderWidth: 2,
    margin: 5,
    marginRight: 15,
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  bookItem: {
    margin: 5,
    width: "55%",
  },
  titleText: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 5,
  },
  assistText: {
    fontSize: 15,
    color: "#585858",
    marginBottom: 3,
  },
  deleteIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ListView;
