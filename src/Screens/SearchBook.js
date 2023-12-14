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
  const [text, setText] = useState("");
  const [searchedBookList, setSearchedBookList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [meta, setMeta] = useState(false);
  const [isBookSearchd, setIsBookSearchd] = useState(false);
  // const [loading, setLoading] = useState(false);
  let key = 0;

  //  console.log(searchedBookList);

  const onEndReached = () => {
    setPageNum(pageNum + 1);
    const callMoreBookAPI = async (bookSearchKeyword) => {
      await axios({
        method: "GET",
        url: `https://dapi.kakao.com/v3/search/book?page=${pageNum}&query=${bookSearchKeyword}`,
        headers: { Authorization: `KakaoAK ${REST_API_KEY}` },
      })
        .then((res) => {
          setSearchedBookList([...searchedBookList, ...res.data.documents]);
          setPageNum(pageNum + 1);
          setMeta(res.data.meta);
          setIsBookSearchd(true);

          if (res.data.meta.is_end === true) return;
        })
        .catch((err) => {
          console.log(err);
          setSearchedBookList([""]);
          setPageNum(1);
          setIsBookSearchd(false);
          if (res.data.meta.is_end === true) return;
        });
    };

    callMoreBookAPI(text);
  };

  const _onPressSearchBook = () => {
    Keyboard.dismiss();
    callBookAPI(text);
  };

  const callBookAPI = async (bookSearchKeyword) => {
    await axios({
      method: "GET",
      url: `https://dapi.kakao.com/v3/search/book?page=${pageNum}&query=${bookSearchKeyword}`,
      headers: { Authorization: `KakaoAK ${REST_API_KEY}` },
    })
      .then((res) => {
        setSearchedBookList([...res.data.documents]);
        setMeta(res.data.meta);
        setIsBookSearchd(true);
        console.log(pageNum);
      })
      .catch((err) => {
        console.log(err);
        setSearchedBookList([""]);
        setPageNum(1);
        setIsBookSearchd(false);
      });
  };

  const BookItem = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => {
        navigation.navigate({
          name: "추가",
          params: {
            title: item.title,
            authors: item.authors,
            publisher: item.publisher,
            thumbnail: item.thumbnail,
          },
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
        <Pressable
          onPress={() => {
            setPageNum(1);
            setSearchedBookList([]);
            _onPressSearchBook();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>검색</Text>
        </Pressable>
      </View>

      {isBookSearchd === true ? (
        <FlatList
          style={styles.flatList}
          data={searchedBookList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <BookItem item={item} key={item.isbn}></BookItem>
          )}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.9}
          // ListFooterComponent={loading && <ActivityIndicator />}
          // keyExtractor={(item) => item.isbn}
          keyExtractor={() => {
            key + 1;
          }}
        />
      ) : (
        <View></View>
      )}
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
