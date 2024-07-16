import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@apollo/client";
import useFetchUserProfiles from "../../hooks/fetchUsers";

import * as SecureStore from "expo-secure-store";
import homeStyles from "../../stylesheets/home/homeStyles";
import StoryBar from "../../components/stories";
import LoadingPage from "../../components/loading";
import { GET_ALL_POSTS, LIKE_POST } from "../../queries/posts";
import timestamp from "../../utils/timeFormat";
import CommentModal from "../../components/modal/comment";
import useProfileStore from "../../stores/profile";

const TopBar = () => {
  return (
    <View style={homeStyles.topBarContainer}>
      <Image
        source={require("../../assets/instagram-logo.png")}
        style={homeStyles.logo}
        resizeMode="cover"
      />
      <View style={homeStyles.iconContainer}>
        <TouchableOpacity>
          <Ionicons
            name="heart-outline"
            size={24}
            color="white"
            style={homeStyles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="paper-plane-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PostCard = ({ post, handleLike, navigation, getPath, userId }) => {
  const [likeIcon, setLikeIcon] = useState("heart-outline");
  const [likeIconColor, setLikeIconColor] = useState("white");
  const [commentVisible, setCommentVisible] = useState(false);
  const { setSelectedProfile } = useProfileStore();
  const profilePicPath = getPath(post.author[0]._id);

  async function viewProfile(userProfile) {
    setSelectedProfile(userProfile);
    navigation.navigate("userProfile2");
  }

  const onPressComment = () => {
    setCommentVisible(!commentVisible);
  };

  const onPressLike = async () => {
    await handleLike(post._id);
    setLikeIcon("heart");
    setLikeIconColor("red");
  };

  return (
    <>
      <View style={homeStyles.contentCard}>
        <TouchableOpacity
          style={homeStyles.contentHeader}
          onPress={() => {
            viewProfile(post.author[0]);
          }}
        >
          {userId === post.author[0]._id ? (
            <Image
              source={require("../../assets/stories/story0.png")}
              style={homeStyles.userImage}
            />
          ) : (
            <Image
              source={
                profilePicPath
                  ? { uri: profilePicPath }
                  : require("../../assets/stories/story0.png")
              }
              style={homeStyles.userImage}
            />
          )}
          <Text style={homeStyles.username}>{post.author[0].username}</Text>
        </TouchableOpacity>
        <Image source={{ uri: post.imgUrl }} style={homeStyles.postImage} />
        <View style={homeStyles.footer}>
          <View style={homeStyles.actions}>
            <TouchableOpacity onPress={onPressLike}>
              <Ionicons name={likeIcon} size={26} color={likeIconColor} />
            </TouchableOpacity>
            <TouchableOpacity
              style={homeStyles.actionIcon}
              onPress={onPressComment}
            >
              <Ionicons name="chatbubble-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.actionIcon}>
              <Ionicons name="paper-plane-outline" size={23} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={homeStyles.captionText}>{post.totalLikes} Likes</Text>
          <View style={homeStyles.caption}>
            <Text style={homeStyles.captionText}>
              {post.author[0].username} {post.content}
            </Text>
          </View>

          <View style={homeStyles.tagsContainer}>
            {post.tags?.map((tag) => {
              return (
                <Text key={tag} style={homeStyles.tags}>
                  #{tag}
                </Text>
              );
            })}
          </View>

          <View style={homeStyles.padTop}>
            <TouchableOpacity onPress={onPressComment}>
              <Text style={homeStyles.commentText}>
                {post.totalComments} Comments
              </Text>
            </TouchableOpacity>
            <Text style={homeStyles.timestamp}>
              {timestamp(post.createdAt)}
            </Text>
          </View>
        </View>
      </View>
      <CommentModal
        isVisible={commentVisible}
        onClose={onPressComment}
        postId={post._id}
        comments={post.comments}
      />
    </>
  );
};

const ContentFrame = ({ posts, handleLike, navigation, getPath, userId }) => {
  return (
    <ScrollView style={homeStyles.content}>
      <StoryBar />
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          handleLike={handleLike}
          navigation={navigation}
          getPath={getPath}
          userId={userId}
        />
      ))}
    </ScrollView>
  );
};

const Homepage = ({ navigation }) => {
  const { getPath } = useFetchUserProfiles();
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  const [userId, setUserId] = useState("");

  const [likeDispatch] = useMutation(LIKE_POST, {
    refetchQueries: [GET_ALL_POSTS],
    awaitRefetchQueries: true,
  });

  const handleLike = async (_id) => {
    await likeDispatch({
      variables: {
        input: {
          _id,
        },
      },
    });
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const usrId = await SecureStore.getItemAsync("userId");
      setUserId(usrId);
    };
    fetchUserId();
  }, []);

  if (loading) return <LoadingPage />;
  if (error) return <Text>{error.message}</Text>;

  return (
    <SafeAreaView style={homeStyles.homeContainer}>
      <ScrollView>
        <TopBar />
        <ContentFrame
          posts={data.ShowPost.data}
          handleLike={handleLike}
          navigation={navigation}
          getPath={getPath}
          userId={userId}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Homepage;
