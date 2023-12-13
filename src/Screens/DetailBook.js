import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Button,
  Modal,
  TextInput,
  Alert,
} from "react-native";

function DetailBook({ route }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <View style={styles.addTop}>
          <Image
            style={styles.addBook}
            id="addBook"
            underlayColor="white"
            source={
              route.params
                ? {
                    uri: route.params.thumbnail,
                  }
                : {
                    uri: "https://i.imgur.com/97OsVAS.png",
                  }
            }
          ></Image>
          <View>
            <Text style={styles.titleText}>{route.params.title}</Text>
            <Text style={styles.assistText}>{route.params.authors}</Text>
            <Text style={styles.assistText}>{route.params.publisher}</Text>
            <View style={{ height: 20 }}></View>
            <Text>읽은 날짜</Text>
            <Text style={styles.readDate}>{route.params.date}</Text>
          </View>
        </View>
        <View style={styles.review}>
          <Text>{route.params.review}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 5,
    alignItems: "center",
    height: "90%",
    width: "90%",
    // backgroundColor: "red",
  },
  addTop: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  addBook: {
    width: 115,
    height: 173,
    borderRadius: 3,
    borderWidth: 2,
    margin: 5,
    marginRight: 15,
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
    // backgroundColor: "purple",
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
    width: 84,
    height: 126,
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
  titleText: {
    fontSize: 20,
    marginTop: 22,
    marginBottom: 5,
  },
  assistText: {
    fontSize: 15,
    color: "#585858",
    marginBottom: 3,
  },
  readDate: {
    fontSize: 20,
  },
  rate: {
    fontSize: 20,
    marginTop: 3,
  },
  review: {
    width: "97%",
    height: "60%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#b1a995",
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    backgroundColor: "#f5f5f5",
    // marginTop: 10,
    // marginBottom: 10,
  },
});

export default DetailBook;
