import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  Alert,
  BackHandler,
} from "react-native";
import axios from "axios";
import { REST_API_KEY } from "../js/Apis";

function SearchBook({ navigation }) {
  const inputAccessoryViewID = "searchBookTitle";
  const initialText = "";
  const [text, setText] = useState(initialText);
  const [searchedBookList, setSearchedBookList] = useState([""]);
  const [pageNum, setPageNum] = useState(1);
  // const [loading, setLoading] = useState(false);

  const onEndReached = () => {
    // if (!loading) {
    // callBookAPI(text);
    // }

    callBookAPI(text);
  };

  const _onPressSearchBook = () => {
    Keyboard.dismiss();
    callBookAPI(text);
  };

  const callBookAPI = async (bookSearchKeyword) => {
    // setLoading(true);
    await axios({
      method: "GET",
      url: `https://dapi.kakao.com/v3/search/book?page=${pageNum}&query=${bookSearchKeyword}`,
      headers: { Authorization: `KakaoAK ${REST_API_KEY}` },
    })
      .then((res) => {
        setSearchedBookList([...res.data.documents]);
        setPageNum(pageNum + 1);
        console.log(searchedBookList);
        console.log(searchedBookList.length);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSearchedBookList([""]);
        setPageNum(1);
        // console.log(searchedBookList);
        // console.log(searchedBookList.length); //왜...1인거냐...
      });
  };

  const BookItem = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => {
        navigation.navigate("추가", {
          title: item.title,
          authors: item.authors,
          publisher: item.publisher,
        });
      }}
    >
      <View style={styles.image}>
        <Image
          style={styles.bookImage}
          source={
            item.thumbnail
              ? {
                  uri: item.thumbnail,
                }
              : {
                  uri: "https://i.imgur.com/97OsVAS.png",
                }
          }
          resizeMode="contain"
        />
      </View>
      <View style={styles.text}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.assistText}>{item.authors}</Text>
        <Text style={styles.assistText}>{item.publisher}</Text>
      </View>
    </Pressable>
    // 목록에서 press 했을 때 효과
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchTab}>
        <TextInput
          style={styles.searchInput}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={setText}
          value={text}
          placeholder={"책 제목을 입력하세요..."}
          selectionColor={"#4DAC27"}
        ></TextInput>
        <Pressable onPress={_onPressSearchBook} style={styles.button}>
          <Text style={styles.buttonText}>검색</Text>
        </Pressable>
      </View>

      {searchedBookList ? (
        <FlatList
          style={styles.flatList}
          data={searchedBookList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => <BookItem item={item}></BookItem>}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.85}
          // ListFooterComponent={loading && <ActivityIndicator />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View></View>
      )}
      {/* TODO: 책 리스트 없을때 수정 필요 */}
      {/* flatList에서 endReached되면 목록의 마지막이 나옴, 이전 목록 안보임 */}
    </View>
  );
}

const styles = StyleSheet.create({
  searchTab: {
    flexDirection: "row",
    padding: 13,
    height: 80,
  },
  searchInput: {
    padding: 16,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: "#4DAC27",
    height: "100%",
    flex: 3,
  },
  button: {
    flex: 1,
    borderRadius: 13,
    backgroundColor: "#4DAC27",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    flex: 1,
  },
  buttonText: {
    color: "white",
  },
  flatList: {
    // flex: 1,
  },
  separator: {
    backgroundColor: "#e0e0e0",
    height: 1,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  bookImage: {
    width: 76,
    height: 112.5,
    borderRadius: 3,
    borderWidth: 2,
    margin: 5,
  },
  text: {
    width: "70%",
    height: 112.5,
  },
  titleText: {
    fontSize: 18,
    marginBottom: 5,
  },
  assistText: {
    fontSize: 15,
    color: "#585858",
    marginBottom: 3,
  },
});

export default SearchBook;
