import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

function Test() {
  const todos = [
    { id: 1, text: "샤워하기", done: true },
    { id: 2, text: "기술 공부하기", done: false },
    { id: 3, text: "독서하기", done: false },
  ];

  return (
    <FlatList
      style={styles.list}
      data={todos}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={[styles.circle, item.done && styles.filled]}>
            {item.done && (
              <Image
                source={{
                  uri: "https://littledeep.com/wp-content/uploads/2020/09/check-icon-style.png",
                }}
              />
            )}
          </View>
          <Text style={[styles.text, item.done && styles.lineThrough]}>
            {item.text}
          </Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    backgroundColor: "#e0e0e0",
    height: 1,
  },
  item: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: "26a69a",
    borderWitdh: 1,
    marginRight: 16,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#212121",
  },
  filled: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#26a69a",
  },
  lineThrough: {
    color: "#9e9e9e",
    textDecorationLine: "line-through",
  },
});

export default Test;
