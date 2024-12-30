import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../utills/Colors";
import HomeScreen from "../screens/HomeScreen";
import HomeIcon from "react-native-vector-icons/Ionicons";
import Books from 'react-native-vector-icons/FontAwesome'  
import Icons from "react-native-vector-icons/FontAwesome5";
import Book from "react-native-vector-icons/MaterialCommunityIcons" 
import Profile from "../screens/Profile";
import AllGenre from "../screens/AllGenre";
import OfflineStorysList from "../screens/OfflineStorysList";
import OfflineStoryGenre from "../screens/OfflineStoryGenre";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary,
        tabBarStyle: {
          marginBottom: 3,
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "700",
        },
      }} 
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ colour, size, focused }) => (
            <HomeIcon
              name="home"
              size={30}
              color={focused ? Colors.secondary : Colors.gray}
            />
          ),
        }}
      />

<Tab.Screen name="Genre"  component={AllGenre} options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Book
                name="book-open-page-variant"
                size={28}
                color={focused ? Colors.secondary : Colors.gray}
              />
            ),
          }}/>
          
          <Tab.Screen
        name="Offline "
        component={OfflineStoryGenre}
        options={{
          tabBarIcon: ({ colour, size, focused }) => (
            <Books
              name="book"
              size={30}
              color={focused ? Colors.secondary : Colors.gray}
            />
          ),
        }}
      />

      <Tab.Screen
        name="My Profile"
        component={Profile}
        options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Icons
                name="user-alt"
                size={28}
                color={focused ? Colors.secondary : Colors.gray}
              />
            ),
          }}
      />
     
    </Tab.Navigator>
  );
};

export default BottomTab;
