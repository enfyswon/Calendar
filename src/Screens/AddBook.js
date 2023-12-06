import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
} from "react-native";

function AddBook({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.addTop}>
        <TouchableHighlight
          style={styles.addBook}
          id="addBook"
          onPress={() => {
            navigation.navigate("도서 검색");
          }}
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

const styles = StyleSheet.create({
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 13,
    padding: 10,
    elevation: 2,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    color: "white",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  searchForm: {
    // backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 80,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 90,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "#000",
  },
});

export default AddBook;
