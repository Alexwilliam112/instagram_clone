import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  
  headerText: {
    flex: 1,
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },

  image: {
    width: '100%',
    height: 200,
    marginBottom: 20
  },

  inputContainer: {
    padding: 15,
  },

  input: {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },

  tagContainer: {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 5
  },

  tag: {
    backgroundColor: '#333333',
    color: '#FFFFFF',
    padding: 5,
    margin: 2,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },

  addButton: {
    padding: 10,
    paddingBottom: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    borderColor: '#1e90ff',
    borderWidth: 1
  },

  addButtonText: {
    color: '#ffffff',
  },

  shareButton: {
    backgroundColor: '#1e90ff',
    padding: 12,
    paddingBottom: 13,
    borderRadius: 5,
    alignItems: 'center',
    margin: 15,
    marginTop: 5
  },
  
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  removeIcon: {
    marginLeft: 5,
  },

  whiteText: {
    color: 'white'
  },

  transparentButton: {
    width: 22
  }
});
