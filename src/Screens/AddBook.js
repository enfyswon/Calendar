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
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import axios from "axios";
//https://github.com/farhoudshapouran/react-native-ui-datepicker

function AddBook({ navigation, route }) {
  // const [value, setValue] = useState(dayjs());
  const [value, setValue] = useState("");
  //날짜가 자동으로 오늘이 되면 좋겠지만 안좋았네요
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewText, setReview] = useState("");

  const putBook = () => {
    axios.post('http://192.168.0.174:3001/api/insertBook', {
      title: route.params.title,
      author: route.params.authors,
      publisher: route.params.publisher,
      date: value,
      star: '',
      review: reviewText,
      thumbnail: route.params.thumbnail
    }).then(res => {
      navigation.navigate("달력");
    }).catch(error => console.log(error));
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "yellow",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <View>
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "yellow",
                marginTop: 110,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 20,
                  padding: 10,
                  paddingTop: 20,
                  backgroundColor: "white",
                  borderRadius: 15,
                  elevation: 2,
                }}
              >
                <DateTimePicker
                  value={value}
                  mode="date"
                  selectedItemColor="#4DAC27"
                  onValueChange={(date) => {
                    setValue(date);
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.addTop}>
          <Pressable
            onPress={() => {
              if (route.params) {
                navigation.navigate("도서 검색", { text: route.params.title });
              } else {
                navigation.navigate("도서 검색");
              }
            }}
          >
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
          </Pressable>
          <View>
            <Text style={styles.titleText}>
              {route.params ? route.params.title : "제목"}
            </Text>
            <Text style={styles.assistText}>
              {route.params ? route.params.authors : "작가"}
            </Text>
            <Text style={styles.assistText}>
              {route.params ? route.params.publisher : "출판사"}
            </Text>
            <View style={{ height: 20 }}></View>
            {/* <Text>읽은 날짜</Text> */}
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text>읽은 날짜</Text>
            </Pressable>
            <Text style={styles.readDate}>{value.substr(0, 10)}</Text>
            {/* <Button
              title="날짜 선택"
              onPress={() => setModalVisible(!modalVisible)}
              color={"#4DAC27"}
            ></Button> */}
            <Text style={styles.rate}>⭐⭐⭐⭐⭐</Text>
          </View>
        </View>
        <View style={styles.review}>
          <TextInput
            value={reviewText}
            selectionColor={"#b1a995"}
            onChangeText={(reviewText) => {
              setReview(reviewText);
            }}
            placeholder="후기 작성..."
          />
        </View>

        <Button
          title="저장"
          color={"#4DAC27"}
          onPress={() => {
            Alert.alert("저장하시겠습니까?", "", [
              {
                text: "아니오",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "네",
                onPress: () => {
                  console.log(route.params);
                  console.log(value);
                  console.log(reviewText);
                  putBook();
                  //console.log(books);
                  //navigation.navigate("달력");
                  //저장하면서 추가 화면 데이터 지우기
                },
              },
            ]);
          }}
        ></Button>
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
    backgroundColor: "red",
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
    fontSize: 18,
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
    width: "100%",
    height: "60%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#4DAC27",
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default AddBook;
