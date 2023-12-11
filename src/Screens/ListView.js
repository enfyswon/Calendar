import { SafeAreaView, FlatList, Text } from "react-native";

const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("안녕하세요!");
});
app.listen(3000, () => console.log("3000포트에서 대기중"));

function ListView() {
  const posts = [
    {
      id: 1,
      title: "첫번째 책.",
      contents: "내용입니다.",
      date: "2023-11-26",
    },
    {
      id: 2,
      title: "두번째 책.",
      contents: "내용입니다.",
      date: "2023-11-27",
    },
  ];
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
