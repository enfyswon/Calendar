import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { REST_API_KEY } from "../js/Apis";

function SearchBook() {
  const inputAccessoryViewID = "searchBookTitle";
  const initialText = "";
  const [text, setText] = useState(initialText);
  const [searchedBookList, setSearchedBookList] = useState([""]);
  const [pageNum, setPageNum] = useState(1);

  const _onPressSearchBook = () => {
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
        setSearchedBookList([...res.data.documents]);
        console.log(searchedBookList);
        // render();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const BookItem = ({ item }) => (
    <View stlye={{ dislpay: "flex", flexDirection: "row" }} key={item.isbn}>
      <Image
        source={
          item.thumnail
            ? {
                uri: "data:image/jpeg;base64,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",
              }
            : { uri: item.thumbnail }
        }
        style={styles.image}
        resizeMode="cover"
      />
      <View>
        <Text>{item.title}</Text>
        <Text>{item.authors}</Text>
        <Text>{item.publisher}</Text>
      </View>
    </View>
  );

  return (
    <View>
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
      <Pressable onPress={_onPressSearchBook}>
        <Text>검색</Text>
      </Pressable>

      {searchedBookList ? (
        <FlatList
          data={searchedBookList}
          renderItem={({ item }) => <BookItem item={item}></BookItem>}
        />
      ) : (
        ``
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 80,
  },
});

export default SearchBook;
