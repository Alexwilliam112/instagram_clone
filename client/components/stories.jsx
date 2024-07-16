import React from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import homeStyles from "../stylesheets/home/homeStyles";

const stories = [
  {
    id: "0",
    name: "Your Story",
    image: require("../assets/stories/story0.png"),
  },
  {
    id: "1",
    name: "MichlSmith",
    image: require("../assets/stories/story1.jpg"),
  },
  {
    id: "2",
    name: "Emily333",
    image: require("../assets/stories/story2.jpeg"),
  },
  {
    id: "3",
    name: "SarahAngel",
    image: require("../assets/stories/story3.jpeg"),
  },
  {
    id: "4",
    name: "Jestay",
    image: require("../assets/stories/story4.jpg"),
  },
  {
    id: "5",
    name: "LiaaBrownns",
    image: require("../assets/stories/story5.jpg"),
  },
];

export default StoryBar = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={homeStyles.storyContainer2}>
      <LinearGradient
        colors={["#FF016C", "#FF7034", "#FFAA29"]}
        style={homeStyles.gradientBorder}
      >
        <View style={homeStyles.imageContainer}>
          <Image source={item.image} style={homeStyles.image} />
        </View>
      </LinearGradient>

      <Text style={homeStyles.storyText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={homeStyles.storyContainer}>
      <FlatList
        data={stories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};