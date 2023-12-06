import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
import CalendarView from "./CalenderView";
import ListView from "./ListView";
import AddBook from "./AddBook";
import Test from "./Test";

function StackNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        initialRouteName="home"
        name="달력"
        component={CalendarView}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="목록"
        component={ListView}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="bars" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="추가"
        component={AddBook}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default StackNavigator;
