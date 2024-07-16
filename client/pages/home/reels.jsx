import React, { useCallback, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import styles from "../../stylesheets/home/reels";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";
import reelsData from "../../utils/reelsData";
import profilePictureSelector from "../../utils/profilePictureSelector";

export default ReelsPage = () => {
  const videoRefs = useRef([]);

  const handlePlayPause = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].getStatusAsync().then((status) => {
        if (status.isPlaying) {
          videoRefs.current[index].pauseAsync();
        } else {
          videoRefs.current[index].playAsync();
        }
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        videoRefs.current.forEach((video) => {
          if (video) {
            video.pauseAsync();
          }
        });
      };
    }, [])
  );

  const renderItem = ({ item, index }) => (
    <View
      style={{
        width: Dimensions.get("window").width,
        height: 770,
      }}
    >
      <TouchableOpacity
        style={styles.video}
        onPress={() => handlePlayPause(index)}
      >
        <Video
          ref={(ref) => (videoRefs.current[index] = ref)}
          style={styles.video}
          source={{ uri: item.videoUri }}
          useNativeControls={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping
        />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <View style={styles.userContainer}>
          <Image source={{ uri: profilePictureSelector() }} style={styles.userImage} />
          <Text style={styles.userName}>{item.userName}</Text>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.caption}>{item.caption}</Text>
      </View>
      <View style={styles.interactionContainer}>
        <TouchableOpacity style={styles.interactionButton}>
          <Ionicons name="heart-outline" size={30} style={styles.icon} />
          <Text style={styles.interactionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Ionicons name="chatbubble-outline" size={30} style={styles.icon} />
          <Text style={styles.interactionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Ionicons name="paper-plane-outline" size={30} style={styles.icon} />
          <Text style={styles.interactionText}>{item.shares}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={reelsData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      vertical
      showsHorizontalScrollIndicator={false}
    />
  );
};
