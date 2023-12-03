import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  Modal,
} from "react-native";
import Test from "./Test";

function AddBook({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const _onPressBookSearch = ({ navigation }) => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.modalText}>직접 등록</Text>
            </Pressable>
            <Text> | </Text>
            <Pressable onPress={_onPressBookSearch}>
              <Text style={styles.modalText}>책 검색</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.addTop}>
        <TouchableHighlight
          style={styles.addBook}
          id="addBook"
          onPress={() => {
            setModalVisible(true);
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
});

export default AddBook;
