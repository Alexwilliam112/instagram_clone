import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: "column",
  },

  content: {
    flex: 10,
    flexDirection: "column",
    backgroundColor: "#070707",
  },

  contentColor: {
    color: "white",
  },

  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#070707",
    borderBottomWidth: 1,
    borderBottomColor: "#070707",
    paddingTop: 20,
  },

  logo: {
    width: 110,
    height: 30,
    resizeMode: "contain",
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginRight: 20,
  },

  storyContainer: {
    paddingVertical: 10,
    backgroundColor: "#070707",
    paddingTop: 20,
  },

  storyContainer2: {
    alignItems: "center",
    marginHorizontal: 7,
    gap: 1,
  },

  storyImage: {
    width: 55,
    height: 55,
    borderRadius: 400,
    borderWidth: 3,
    borderColor: "#FF016C",
  },

  storyText: {
    marginTop: 5,
    fontSize: 12,
    color: "white",
  },

  gradientBorder: {
    width: 86,
    height: 86,
    borderRadius: 43,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "#070707",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 74,
    height: 74,
    borderRadius: 300,
  },

  contentCard: {
    marginVertical: 10,
    backgroundColor: "#070707",
    borderRadius: 10,
    overflow: "hidden",
  },

  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },

  contentHeader2: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingBottom: 20
  },

  userImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#FF7034",
  },

  username: {
    fontWeight: "bold",
    color: "white",
  },

  postImage: {
    width: "100%",
    height: 300,
  },

  footer: {
    padding: 10,
  },

  actions: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 5,
    paddingVertical: 2,
  },

  tagsContainer: {
    flexDirection: 'row',
    gap: 7,
    marginLeft: 4
  },

  tags: {
    color: 'gray',
    fontSize: 13
  },

  extraPad: {
    paddingLeft: 10,
  },

  actionIcon: {
    marginLeft: 10,
  },

  caption: {
    lineHeight: 18,
    color: "white",
    flexDirection: "row",
    gap: 0,
    marginLeft: 0,
    marginRight: 1,
  },

  captionText: {
    color: "white",
    paddingLeft: 5,
    lineHeight: 20,
  },

  commentText: {
    color: "#636363",
    paddingLeft: 5,
    paddingVertical: 3,
    paddingTop: 0
  },

  timestamp: {
    color: "#636363",
    paddingLeft: 5,
    fontSize: 11,
  },

  padTop: {
    paddingTop: 2,
  },

  viewPostContainer: {
    height: '100%',
    paddingTop: 10,
    backgroundColor: '#070707'
  }
});
