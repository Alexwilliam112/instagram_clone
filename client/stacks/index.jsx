import { FontAwesome6, Ionicons, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { StatusBar, Image } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { AuthContext } from "../contexts/authContext";
import styles from '../stylesheets/authStyles'
import AuthStacks from "./auth";
import HomeStacks from "./home";
import ExploreStack from "./exploreStack"
import CreatePostPage from '../pages/home/createPost'
import ReelsPage from '../pages/home/reels'
import ProfilePage from '../pages/profile'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "#222222",
          paddingTop: 10,
          height: 55,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeStacks}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home-variant"
              size={30}
              color={focused ? "white" : "gray"}
            />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="explore"
        component={ExploreStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="magnifying-glass" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="newPost"
        component={CreatePostPage}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="diff-added" size={26} color={color} />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="reels"
        component={ReelsPage}
        options={{
          tabBarIcon: ({ color, focused }) => (
            // <Entypo name="video" size={26} color={color} />
            <Image style={styles.iconImage} source={focused ? require('../assets/icons/reelIcon.jpg') : require('../assets/icons/reelIcon_unfoc.jpg')} />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainNavigation = () => {
  const { validAuth } = useContext(AuthContext);
  return (
    <>
      <StatusBar backgroundColor="#070707" barStyle="black" />
      {validAuth ? <TabNavigator /> : <AuthStacks />}
    </>
  );
};
