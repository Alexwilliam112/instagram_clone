import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
    marginLeft: 10,
  },

  searchIcon: {
    marginRight: 10,
  },

  searchBar: {
    flex: 1,
    color: "#fff",
    height: 40,
  },

  content: {
    marginTop: 20,
  },

  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  recentText: {
    color: "#fff",
    fontWeight: "bold",
  },

  seeAllText: {
    color: "#1E90FF",
  },

  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 10,
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },

  recentInfo: {
    flex: 1,
  },

  username: {
    color: "#fff",
    fontWeight: "bold",
  },

  followInfo: {
    color: "#999",
    fontSize: 13
  },

  noResultContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  noResult: {
    color: "white",
  },
});
