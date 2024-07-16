import { StyleSheet } from "react-native";

export default StyleSheet.create({
  commentModal: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 0,
  },

  commentContainer: {
    height: "50%",
    backgroundColor: "#1E1E1E",
    padding: 20,
    paddingTop: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  commentRow: {
    flexDirection: "row",
    alignItems: "top",
    marginBottom: 10,
    marginTop: 5,
    justifyContent: "space-between",
  },

  commentProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
    marginTop: 5,
    borderWidth: 1.3,
    borderColor: "#FF7034",
  },

  myProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1.3,
    paddingVertical: 8,
  },

  commentTextContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    paddingTop: 0,
    gap: 2,
  },

  commentHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10
  },

  commentUsername: {
    color: "white",
    fontSize: 12,
  },

  timestamp: {
    color: "gray",
    marginTop: 3,
    fontSize: 11,
  },

  commentText: {
    color: "white",
  },

  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 0,
    borderColor: "#636363",
    paddingTop: 10,
  },

  commentInput: {
    flex: 1,
    color: "white",
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },

  submitComment: {
    color: "#0095f6",
    fontWeight: "bold",
    fontSize: 13
  },

  replyText: {
    color: "gray",
    marginTop: 3,
    fontSize: 11,
    fontWeight: "bold",
  },

  heartIcon: {
    marginLeft: 10,
    marginTop: 5,
  },

  topBarContainer: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    gap: 9,
    marginTop: 13,
  },

  topBar: {
    height: 3.5,
    backgroundColor: "#B1B1B1",
    width: 40,
    borderRadius: 100,
  },

  commentTitle: {
    fontWeight: "500",
    color: "white",
    fontSize: 14,
  },
});
