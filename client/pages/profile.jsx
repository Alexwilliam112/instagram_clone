import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import { GET_POST_BY_AUTHOR } from "../queries/posts";
import { GET_CURRENT_USER } from "../queries/users";
import profileStyles from "../stylesheets/profiles/profile";
import { AuthContext } from "../contexts/authContext";
import LoadingPage from "../components/loading";

export default ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_POST_BY_AUTHOR);
  const { data: user_data } = useQuery(GET_CURRENT_USER);
  const { setValidAuth } = useContext(AuthContext);

  if (loading) return <LoadingPage />;
  if (error) return <Text>Error: {error.message}</Text>;

  const posts = data?.GetPostByAuthor.data;
  const postCount = posts.length;
  const user = user_data?.GetCurrentUser.data;

  async function handleLogout() {
    console.log("Logging Out");
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("username");
    await SecureStore.deleteItemAsync("userId");
    setValidAuth(false);
  }

  const Header = () => (
    <View>
      <View style={profileStyles.header}>
        <View style={profileStyles.headerLeft}>
          <Text style={profileStyles.username}>@{user?.username}</Text>
          <Ionicons name="chevron-down" size={20} color="white" />
        </View>
        <View style={profileStyles.headerRight}>
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <Ionicons
            name="menu"
            size={24}
            color="white"
            style={profileStyles.icon}
          />
        </View>
      </View>
      <View style={profileStyles.profileInfoContainer}>
        <View style={profileStyles.profileContainer}>
          <Image
            source={require("../assets/stories/story0.png")}
            style={profileStyles.profileImage}
          />
          <Text style={profileStyles.name}>{user?.name}</Text>
        </View>
        <View style={profileStyles.profileDetails}>
          <View style={profileStyles.followInfoContainer}>
            <View style={profileStyles.statContainer}>
              <Text style={profileStyles.stats}>{postCount}</Text>
              <Text style={profileStyles.followInfo}>posts</Text>
            </View>
            <View style={profileStyles.statContainer}>
              <Text style={profileStyles.stats}>{user?.followerCount}</Text>
              <Text style={profileStyles.followInfo}>followers</Text>
            </View>
            <View style={profileStyles.statContainer}>
              <Text style={profileStyles.stats}>{user?.followingCount}</Text>
              <Text style={profileStyles.followInfo}>following</Text>
            </View>
          </View>
          <View style={profileStyles.buttonContainer}>
            <TouchableOpacity style={profileStyles.button}>
              <Text style={profileStyles.buttonText}>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={profileStyles.button}
              onPress={handleLogout}
            >
              <Text style={profileStyles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      style={profileStyles.container}
      data={posts}
      keyExtractor={(item) => item._id}
      numColumns={3}
      ListHeaderComponent={Header}
      renderItem={({ item }) => (
        <Image source={{ uri: item.imgUrl }} style={profileStyles.postImage} />
      )}
    />
  );
};
