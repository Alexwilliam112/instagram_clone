import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  header: {
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: 8,
  },

  searchBar: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    paddingVertical: 7,
    color: 'white',
    fontWeight: '400'
  },

  image: {
    width: '100%',
    height: 150,
    borderWidth: 1.2,
    borderColor: 'black'
  },

  imageContainer: {
    width: '33.33%',
    backgroundColor: "#070707",
  }
});