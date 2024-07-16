import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../../stylesheets/home/createPost";
import { Ionicons } from "@expo/vector-icons";
import { CREATE_POST, GET_ALL_POSTS } from "../../queries/posts";
import { useMutation } from "@apollo/client";
import ErrorModal from "../../components/modal/errorModal";
import NotificationModal from "../../components/modal/notificationModal";
import ValidationModal from "../../components/modal/validationModal";

export default CreatePostPage = ({ navigation }) => {
  const [errorObj, setErrorMessage] = useState("");
  const [errorToggle, setErrorToggle] = useState(false);
  const [notifToggle, setNotifToggle] = useState(false);
  const [validationToggle, setValidationToggle] = useState(false);

  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const [fnDispatch] = useMutation(CREATE_POST, {
    refetchQueries: [GET_ALL_POSTS],
    awaitRefetchQueries: true,
    onCompleted: async () => {
      setContent("");
      setImgUrl("");
      setTags([]);
      setTagInput("");
      setNotifToggle(true);
      setTimeout(() => {
        navigation.navigate("homepage");
      }, 1000);
    },

    onError: (error) => {
      setErrorMessage(error);
      setErrorToggle(true);
    },
  });

  const handlePost = async () => {
    if (!content || !imgUrl) {
      setValidationToggle(true);
      return;
    }

    await fnDispatch({
      variables: {
        input: {
          content,
          imgUrl,
          tags,
        },
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.transparentButton}
          onPress={() => {
            navigation.navigate("homepage");
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>New Post</Text>
      </View>
      <Image
        source={require("../../assets/placeholder_createPost.jpg")}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a caption..."
          placeholderTextColor="#888888"
          value={content}
          onChangeText={setContent}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          placeholderTextColor="#888888"
          value={imgUrl}
          onChangeText={setImgUrl}
        />
        {tags.length > 0 && (
          <View style={styles.tagContainer}>
            {tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.whiteText}>#{tag}</Text>
                <Ionicons
                  name="close"
                  size={16}
                  color="#ffffff"
                  style={styles.removeIcon}
                  onPress={() => removeTag(index)}
                />
              </View>
            ))}
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder="Input Tag.."
          placeholderTextColor="#888888"
          value={tagInput}
          onChangeText={setTagInput}
          onSubmitEditing={addTag}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTag}>
          <Text style={styles.addButtonText}>Add Tag</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.shareButton} onPress={handlePost}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>

      <ErrorModal
        modalVisible={errorToggle}
        setModalVisible={setErrorToggle}
        errorObj={errorObj}
      />

      <NotificationModal
        modalVisible={notifToggle}
        setModalVisible={setNotifToggle}
        modalTitle={"Posted!"}
        message={"Your Post has been created"}
      />

      <ValidationModal
        modalVisible={validationToggle}
        setModalVisible={setValidationToggle}
      />
    </ScrollView>
  );
};
