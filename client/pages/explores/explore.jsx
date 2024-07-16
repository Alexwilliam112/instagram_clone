import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "../../stylesheets/explores/exploreStyles";
import imageData from "../../utils/exploreData";
import useSearchStore from "../../stores/search";
import { FIND_USERS } from "../../queries/users";
import { useLazyQuery } from "@apollo/client";

export default ExplorePage = ({ navigation }) => {
  const [searchDispatch] = useLazyQuery(FIND_USERS);
  const { setSearchResults } = useSearchStore();
  const [searchChar, setSearchChar] = useState("");

  async function handleSearch() {
    if (!searchChar) return;
    const resp = await searchDispatch({
      variables: { input: { nameOrUsername: searchChar } },
    });

    setSearchResults(resp.data.FindUser.data);
    setSearchChar("")
    navigation.navigate("searchResult");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#999"
          onChangeText={(text) => setSearchChar(text)}
          value={searchChar}
          onSubmitEditing={handleSearch}
        />
      </View>

      <FlatList
        data={imageData}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.imageContainer}>
            <Image source={{ uri: item.src }} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
