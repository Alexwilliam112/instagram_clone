import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import useFetchUserProfiles from "../../hooks/fetchUsers";
import useSelectedPost from "../../stores/post";
import { GET_POST_USER_PROFILE } from "../../queries/posts";
import { GET_USER_PROFILE, GET_CURRENT_USER } from "../../queries/users";
import { FOLLOW_QUERY } from "../../queries/follows";
import styles from "../../stylesheets/profiles/userProfile";
import LoadingPage from "../../components/loading";
import useProfileStore from "../../stores/profile";
import { useEffect, useState } from "react";

export default UserProfile = ({ navigation }) => {
  const { getPath } = useFetchUserProfiles();
  const [followed, setFollowed] = useState(false);
  const { selectedProfile } = useProfileStore();
  const { setSelectedPostId } = useSelectedPost();

  const { loading, error, data } = useQuery(GET_POST_USER_PROFILE, {
    variables: { input: { UserId: selectedProfile._id } },
  });

  const { data: profileData } = useQuery(GET_USER_PROFILE, {
    variables: { input: { userId: selectedProfile._id } },
  });

  const [followDispatch] = useMutation(FOLLOW_QUERY, {
    refetchQueries: [GET_USER_PROFILE, GET_CURRENT_USER],
    awaitRefetchQueries: true,
  });

  const handleFollow = async () => {
    await followDispatch({
      variables: {
        input: {
          followingId: selectedProfile._id,
        },
      },
    });
  };

  const handleSelectPost = async (_id) => {
    setSelectedPostId(_id);
    navigation.navigate("postPage");
  };

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (profileData) {
        let followers = profileData?.GetUserById.data.followers.map(
          (obj) => obj.followerId
        );
        if (!followers) followers = [];
        const userId = await SecureStore.getItem("userId");
        if (followers.includes(userId)) setFollowed(true);
      }
    };
    checkFollowStatus();
  }, [profileData]);

  if (loading) return <LoadingPage />;
  if (error) return <Text>Error: {error.message}</Text>;

  const posts = data?.GetAllPostByUser?.data;
  const postCount = posts.length;

  const Header = () => (
    <View>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.username}>{selectedProfile?.username}</Text>
        </View>
        <View style={styles.headerRight}>
          <FontAwesome5 name="bell" size={24} color="white" />
        </View>
      </View>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: getPath(selectedProfile._id) }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{selectedProfile?.username}</Text>
        </View>
        <View style={styles.profileDetails}>
          <View style={styles.followInfoContainer}>
            <View style={styles.statContainer}>
              <Text style={styles.stats}>{postCount}</Text>
              <Text style={styles.followInfo}>posts</Text>
            </View>
            <View style={styles.statContainer}>
              <Text style={styles.stats}>
                {profileData?.GetUserById.data.followerCount}
              </Text>
              <Text style={styles.followInfo}>followers</Text>
            </View>
            <View style={styles.statContainer}>
              <Text style={styles.stats}>
                {profileData?.GetUserById.data.followingCount}
              </Text>
              <Text style={styles.followInfo}>following</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {followed ? (
              <TouchableOpacity style={styles.followed}>
                <Text style={styles.buttonText}>Following</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleFollow}>
                <Text style={styles.buttonText}>Follow</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={posts}
      keyExtractor={(item) => item._id}
      numColumns={3}
      ListHeaderComponent={Header}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.postContainer}
          onPress={() => {
            handleSelectPost(item._id);
          }}
        >
          <Image source={{ uri: item.imgUrl }} style={styles.postImage} />
        </TouchableOpacity>
      )}
    />
  );
};
