import { SafeAreaView, FlatList, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("RNtestDB.db");
  return db;
}

const db = openDatabase();

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
