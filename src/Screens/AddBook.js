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
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { REST_API_KEY } from "../js/Apis";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";

function AddBook({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const inputAccessoryViewID = "searchBookTitle";
  const initialText = "";
  const [text, setText] = useState(initialText);
  const [searchedBookList, setSelectedBookList] = useState([""]);
  const [pageNum, setPageNum] = useState(1);

  const _onPressBookSearch = ({ navigation }) => {
    setModalVisible(!modalVisible);
  };

  const _onPressSearchBook = () => {
    Alert.alert(text);
    callBookAPI(text);
  };

  const callBookAPI = async (bookSearchKeyword) => {
    await axios({
      method: "GET",
      url: `https://dapi.kakao.com/v3/search/book?page=${pageNum}&query=${bookSearchKeyword}`,
      headers: { Authorization: `KakaoAK ${REST_API_KEY}` },
    })
      .then((res) => {
        //searchedBookList = [...res.data.documents];
        setSelectedBookList([...res.data.documents]);
        console.log(searchedBookList);
        // render();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const render = () => {
    const bookListTemplate = searchedBookList
      ? searchedBookList
          .map((item, index) => {
            return `
            <View data-book-id="${index}">
              <Image
                source=${item.thumbnail}></Image>
              <Text>${item.title}</Text>
              <Text>${item.authors}</Text>
              <Text>${item.publisher}</Text>
              <Text>${item.datetime}</Text>
            </View>
          `;
          })
          .join("")
      : `<Text>검색 결과가 없습니다.</Text>`;

    document.getElementById("#test").innerHTML = bookListTemplate;
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
          <Text>도서 검색</Text>
          <View style={styles.searchForm}>
            <TextInput
              style={{
                padding: 16,
                marginLeft: 10,
              }}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setText}
              value={text}
              placeholder={"책 제목을 입력하세요..."}
            ></TextInput>
            <Pressable
              style={(styles.button, styles.buttonClose)}
              onPress={_onPressSearchBook}
            >
              <Text>검색</Text>
            </Pressable>
          </View>
          <Text style={{ flex: 1 }}>
            {searchedBookList
              ? searchedBookList.map((item, index) => (
                  <View key={index} style={styles.item}>
                    <Image
                      source={{ uri: item.thumbnail }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <Text>{item.title}</Text>
                    <Text>{item.authors}</Text>
                    <Text>{item.publisher}</Text>
                    <Text>{item.datetime}</Text>
                  </View>
                ))
              : ``}
            {/* {searchedBookList
              ? searchedBookList.map((item, index) => (
                  <ScrollView key={index} data={item}>
                    <Image
                      source={{ uri: item.thumbnail }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <Text>{item.title}</Text>
                  </ScrollView>
                ))
              : ``} */}
          </Text>
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
    alignContent: "center",
    justifyContent: "center",
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
