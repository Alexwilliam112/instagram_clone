import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingTop: 20,
    backgroundColor: "#070707",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginLeft: 15,
  },

  username: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 5,
  },

  profileInfoContainer: {
    flexDirection: "row",
    padding: 20,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 20,
  },

  profileDetails: {
    flex: 1,
    gap: 15
  },

  name: {
    color: "white",
    fontSize: 13,
    marginBottom: 5,
  },

  followInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
  },

  followInfo: {
    color: "white",
    fontSize: 14,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 5,
  },

  button: {
    backgroundColor: '#202020',
    flex: 1,
    padding: 7,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12
  },

  postImage: {
    width: "33.33%",
    height: 120,
    margin: 1,
  },

  profileContainer: {
    flexDirection: 'column',
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "baseline",
    marginRight: 10
  },

  statContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2
  },

  stats: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500'
  }
});
