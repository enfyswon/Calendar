import { SafeAreaView, FlatList, Text } from "react-native";

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
