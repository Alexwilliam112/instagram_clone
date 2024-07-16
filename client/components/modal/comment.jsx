import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { useMutation } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";

import commentModalStyles from "../../stylesheets/commentModalStyles";
import { COMMENT_POST, GET_ALL_POSTS } from "../../queries/posts";
import timestamp from "../../utils/timeFormat";

export default CommentModal = ({ isVisible, onClose, postId, comments }) => {
  const [newComment, setNewComment] = useState("");
  const [addComment] = useMutation(COMMENT_POST, {
    refetchQueries: [GET_ALL_POSTS],
  });

  const handleAddComment = async () => {
    await addComment({
      variables: {
        input: {
          _id: postId,
          content: newComment,
        },
      },
    });
    setNewComment("");
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={commentModalStyles.commentModal}
    >
      <View style={commentModalStyles.commentContainer}>
        <View style={commentModalStyles.topBarContainer}>
          <View style={commentModalStyles.topBar}></View>
          <Text style={commentModalStyles.commentTitle}>Comments</Text>
        </View>
        <ScrollView>
          {comments?.map((comment, index) => (
            <View key={index} style={commentModalStyles.commentRow}>
              <Image
                source={require("../../assets/profiles/commentPic.jpg")}
                style={commentModalStyles.commentProfileImage}
              />

              <View style={commentModalStyles.commentTextContainer}>
                <View style={commentModalStyles.commentHeader}>
                  <Text style={commentModalStyles.commentUsername}>
                    {comment.username}
                  </Text>
                  <Text style={commentModalStyles.timestamp}>
                    {timestamp(comment.createdAt)}
                  </Text>
                </View>
                <Text style={commentModalStyles.commentText}>
                  {comment.content}
                </Text>
                <TouchableOpacity>
                  <Text style={commentModalStyles.replyText}>Reply</Text>
                </TouchableOpacity>
              </View>

              <Ionicons
                name="heart-outline"
                size={24}
                color="white"
                style={commentModalStyles.heartIcon}
              />
            </View>
          ))}
        </ScrollView>
        <View style={commentModalStyles.commentInputContainer}>
          <Image
            source={require("../../assets/stories/story0.png")}
            style={commentModalStyles.myProfileImage}
          />
          <TextInput
            style={commentModalStyles.commentInput}
            placeholder="Add a comment..."
            placeholderTextColor="#636363"
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={handleAddComment}>
            <Text style={commentModalStyles.submitComment}>POST</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
