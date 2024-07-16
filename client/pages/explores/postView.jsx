import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import useSelectedPost from "../../stores/post";
import { LIKE_POST } from "../../queries/posts";
import { GET_POST_BY_ID } from "../../queries/posts";
import homeStyles from "../../stylesheets/home/homeStyles";
import styles from "../../stylesheets/profiles/userProfile";
import LoadingPage from "../../components/loading";
import { useEffect, useState } from "react";
import timestamp from "../../utils/timeFormat";
import CommentModal from "../../components/modal/comment";

export default PostViewPage = ({ navigation }) => {
  const { selectedPostId } = useSelectedPost();

  const [likeIcon, setLikeIcon] = useState("heart-outline");
  const [likeIconColor, setLikeIconColor] = useState("white");
  const [commentVisible, setCommentVisible] = useState(false);
  const [userId, setUserId] = useState("");

  const { error, loading, data } = useQuery(GET_POST_BY_ID, {
    variables: {
      input: {
        PostId: selectedPostId,
      },
    },
  });
  const postData = data?.GetPostById?.data;

  const [likeDispatch] = useMutation(LIKE_POST, {
    refetchQueries: [GET_POST_BY_ID],
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

  const onPressComment = () => {
    setCommentVisible(!commentVisible);
  };

  const onPressLike = async () => {
    if (postData && postData._id) {
      await handleLike(postData._id);
      setLikeIcon("heart");
      setLikeIconColor("red");
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const usrId = await SecureStore.getItemAsync("userId");
      setUserId(usrId);
    };
    fetchUserId();
  }, []);

  if (loading) return <LoadingPage />;
  if (error) return <Text>Error loading post.</Text>;

  return (
    <>
      <View style={homeStyles.viewPostContainer}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRight}>
            <SimpleLineIcons name="options-vertical" size={16} color="white" />
          </View>
        </View>
        <View style={homeStyles.contentCard}>
          <TouchableOpacity
            style={homeStyles.contentHeader2}
            onPress={() => {
              navigation.goBack();
            }}
          >
            {userId === postData?.author?.[0]?._id ? (
              <Image
                source={require("../../assets/stories/story0.png")}
                style={homeStyles.userImage}
              />
            ) : (
              <Image
                source={require("../../assets/profiles/blank.jpg")}
                style={homeStyles.userImage}
              />
            )}
            <Text style={homeStyles.username}>
              {postData?.author?.[0]?.username}
            </Text>
          </TouchableOpacity>
          <Image
            source={{ uri: postData?.imgUrl }}
            style={homeStyles.postImage}
          />
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

            <Text style={homeStyles.captionText}>
              {postData?.totalLikes} Likes
            </Text>
            <View style={homeStyles.caption}>
              <Text style={homeStyles.captionText}>
                {postData?.author?.[0]?.username} {postData?.content}
              </Text>
            </View>

            <View style={homeStyles.tagsContainer}>
              {postData?.tags?.map((tag) => {
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
                  {postData?.totalComments} Comments
                </Text>
              </TouchableOpacity>
              <Text style={homeStyles.timestamp}>
                {timestamp(postData?.createdAt)}
              </Text>
            </View>
          </View>
        </View>
        <CommentModal
          isVisible={commentVisible}
          onClose={onPressComment}
          postId={postData?._id}
          comments={postData?.comments}
        />
      </View>
    </>
  );
};
