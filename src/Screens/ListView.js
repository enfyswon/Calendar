import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text } from "react-native";

const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("안녕하세요!");
});
app.listen(3000, () => console.log("3000포트에서 대기중"));

function ListView() {
  // const posts = [
  //   {
  //     id: 1,
  //     title: "첫번째 책.",
  //     contents: "내용입니다.",
  //     date: "2023-11-26",
  //   },
  //   {
  //     id: 2,
  //     title: "두번째 책.",
  //     contents: "내용입니다.",
  //     date: "2023-11-27",
  //   },
  // ];

  const [inputData, setInputData] = useState([{
    book_id: '',
    book_date: '',
    book_title: '',
    book_author: '',
    book_publisher: '',
    book_star: '',
    book_review: '',
    book_thumbnail: ''
  }])

  const [lastIdx, setLastIdx] = useState(0);

  useEffect(async() => {
    try {
      const res = await axios.get('/api/booklist');
      const _inputData = await res.data.map((rowData) => {
        setLastIdx(lastIdx + 1),
        {
          book_id: rowData.book_id,
          book_title: rowDate
        }
      })
    } catch(e) {
      console.error(e.message);
    }
  })
  return (
    <SafeAreaView>
      <FlatList
        data={[...posts]}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      ></FlatList>
    </SafeAreaView>
  );
}

export default ListView;
