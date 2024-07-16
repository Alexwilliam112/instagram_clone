import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "../../stylesheets/explores/searchStyles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import useSearchStore from "../../stores/search";
import { FIND_USERS } from "../../queries/users";
import { useLazyQuery } from "@apollo/client";
import profilePictureSelector from "../../utils/profilePictureSelector";
import followingSelector from "../../utils/followingSelector";
import useProfileStore from "../../stores/profile";
import useFetchUserProfiles from "../../hooks/fetchUsers";

export default SearchResult = ({ navigation }) => {
  const { getPath } = useFetchUserProfiles();
  const { setSelectedProfile } = useProfileStore();
  const [searchDispatch] = useLazyQuery(FIND_USERS);
  const { searchResults, setSearchResults } = useSearchStore();
  const [searchChar, setSearchChar] = useState("");

  async function viewProfile(userProfile) {
    setSelectedProfile(userProfile);
    navigation.navigate("userProfile");
  }

  async function handleSearch() {
    if (!searchChar) return;
    const resp = await searchDispatch({
      variables: { input: { nameOrUsername: searchChar } },
    });

    setSearchResults(resp.data.FindUser.data);
    setSearchChar("");
    navigation.navigate("searchResult");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("exploreScreen");
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor="#999"
            onChangeText={(text) => setSearchChar(text)}
            value={searchChar}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>
      <View style={styles.recentHeader}>
        <Text style={styles.recentText}>Recent</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      {searchResults.length === 0 ? (
        <View style={styles.noResultContainer}>
          <Text style={styles.noResult}>no result</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          numColumns={1}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => {
                viewProfile(item)
              }}
            >
              <View style={styles.content}>
                <View style={styles.recentItem}>
                  <Image
                    source={{uri: getPath(item._id)}}
                    style={styles.profileImage}
                  />
                  <View style={styles.recentInfo}>
                    <Text style={styles.username}>{item.username}</Text>
                    <Text style={styles.followInfo}>{followingSelector()}</Text>
                  </View>
                  <TouchableOpacity>
                    <AntDesign name="close" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};
